import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { constructAndLoadRoom, Diograph } from "@diograph/diograph";
import { HttpClient } from "@diograph/http-client";
import { validateDiograph } from "@diograph/diograph/validator";
import { IDiographObject, IDioryObject } from "@diograph/diograph/types";

const roomAddress1 =
  "https://raw.githubusercontent.com/DioryMe/demo-content-room/refs/heads/main";
const roomAddress2 = "http://diory-demo-content.surge.sh";
const roomAddress3 = "http://localhost:8080/RoomName";
const roomAddress4 = "http://localhost:8080/OopeeDiory";
const roomAddress = roomAddress4;

// const token1 = "Bearer e10d1d2e-032e-4c42-bc53-587239a3119f";
const basicAuthToken = "e10d1d2e-032e-4c42-bc53-587239a3119f";

// Replace the empty loadDioryContent with the following async thunk:
export const loadDioryContent = createAsyncThunk(
  "diory/loadDioryContent",
  async (diory: IDioryObject) => {
    // Verify the diory has content data
    if (!diory.data || !diory.data.length) {
      throw new Error("No content available in diory");
    }
    const cid = diory.data[0].contentUrl;
    const mimeType = diory.data[0]["encodingFormat"];

    // Create and load the room; ensure constructAndLoadRoom is correctly imported.
    const room = await constructAndLoadRoom(roomAddress, "HttpClient", {
      HttpClient: {
        clientConstructor: HttpClient,
        credentials: { basicAuthToken },
      },
    });
    console.log("BOOM", cid);
    const response = await room.readContent(cid);
    const blob = new Blob([response], { type: mimeType });
    // Return the diory id with the generated blob URL.
    return { id: diory.id, url: URL.createObjectURL(blob), mimeType };
  }
);

// Thunk action to asynchronously load the diograph
export const loadDiograph = createAsyncThunk("diory/loadDiograph", async () => {
  const httpClient = new HttpClient(roomAddress, {
    basicAuthToken,
  });
  // const httpClient = new HttpClient(roomAddress);
  const diographContents = await httpClient.readTextItem("diograph.json");
  const diographJson = JSON.parse(diographContents);
  validateDiograph(diographJson);
  return diographJson;
});

// Define the initial state using the DioryInfo shape
interface DioryState {
  diograph: IDiographObject | null;
  focusId: string | null;
  storyId: string | null;
  storyDiories: IDioryObject[];
  prevId: string;
  nextId: string;
  stories: IDioryObject[];
  contentUrls: { [key: string]: { url: string; mimeType: string } };
}

const initialState: DioryState = {
  diograph: null,
  focusId: null,
  storyId: null,
  storyDiories: [],
  prevId: null,
  nextId: null,
  stories: [],
  contentUrls: {},
};

const getStoryDiories = (storyId: string, diograph: IDiographObject) => {
  if (!storyId) return null;
  const diographInstance = new Diograph(diograph);
  const storyDiory = diographInstance.getDiory({ id: storyId });
  return storyDiory.links.map((link) =>
    diographInstance.getDiory({ id: link.id }).toObject()
  );
};

const getStories = (focusId: string, diograph: IDiographObject) => {
  return Object.values(diograph).filter((dioryData: IDioryObject) =>
    dioryData.links?.some((link) => link.id === focusId)
  );
};

const getPrevNext = (storyId, focusId, diograph) => {
  if (!storyId) return null;
  let prevId = null;
  let nextId = null;
  const diographInstance = new Diograph(diograph);
  const storyDiory = diographInstance.getDiory({ id: storyId });

  const focusDioryIndexInStory =
    storyDiory.links?.findIndex((link) => link.id === focusId) ?? -1;

  const prevTargetIndex = focusDioryIndexInStory - 1;
  const nextTargetIndex = focusDioryIndexInStory + 1;

  const prevDisabled =
    !storyDiory.links ||
    prevTargetIndex < 0 ||
    prevTargetIndex >= storyDiory.links.length;

  const nextDisabled =
    !storyDiory.links ||
    nextTargetIndex < 0 ||
    nextTargetIndex >= storyDiory.links.length;

  prevId = prevDisabled ? null : storyDiory.links![prevTargetIndex].id;
  nextId = nextDisabled ? null : storyDiory.links![nextTargetIndex].id;

  return { prevId, nextId };
};

const diorySlice = createSlice({
  name: "diory",
  initialState,
  reducers: {
    setFocus(
      state,
      action: PayloadAction<{ focusId: string; storyId?: string | null }>
    ) {
      const oldStoryId = state.storyId;
      const { focusId, storyId } = action.payload;
      state.focusId = focusId;
      state.stories = getStories(focusId, state.diograph);
      const newStoryId =
        storyId || (state.stories[0] && state.stories[0].id) || null;
      if (oldStoryId !== newStoryId) {
        const focusContentUrl = state.contentUrls[storyId];
        // TODO: Revoke URLs if necessary before clearing them.
        state.contentUrls = {};
        state.contentUrls[storyId] = focusContentUrl;
      }
      state.storyId = newStoryId;
      state.storyDiories = getStoryDiories(state.storyId, state.diograph);
      const { prevId, nextId } = getPrevNext(
        state.storyId,
        focusId,
        state.diograph
      );
      state.prevId = prevId;
      state.nextId = nextId;
    },
    // setStoryDiory allows updating just the story piece of the state.
    setStory(state, action: PayloadAction<any>) {
      state.storyId = action.payload;
    },
    setDiograph(state, action: PayloadAction<any>) {
      state.diograph = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadDiograph.fulfilled,
      (state, action: PayloadAction<IDiographObject>) => {
        state.diograph = action.payload;
      }
    );
    builder.addCase(loadDioryContent.fulfilled, (state, action) => {
      const { id, url, mimeType } = action.payload;
      state.contentUrls[id] = { url, mimeType };
    });
  },
});

export const { setFocus, setStory, setDiograph } = diorySlice.actions;
export default diorySlice.reducer;
