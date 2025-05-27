import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DioryInfo, getDioryInfo } from "../utils/dioryInfo";
import { Diograph } from "@diograph/diograph";
import { HttpClient } from "@diograph/http-client";
import { validateDiograph } from "@diograph/diograph/validator";
import { IDiographObject, IDioryObject } from "@diograph/diograph/types";
import diographJson from "../../diograph.json";

// Thunk action to asynchronously load the diograph
export const loadDiograph = createAsyncThunk("diory/loadDiograph", async () => {
  // const httpClient = new HttpClient("http://diory-demo-content.surge.sh");
  // const diographContents = await httpClient.readTextItem("diograph.json");
  // const diographJson = JSON.parse(diographContents);
  validateDiograph(diographJson);
  return diographJson;
  // return new Diograph(diographJson);
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
}

const initialState: DioryState = {
  diograph: null,
  focusId: null,
  storyId: null,
  storyDiories: [],
  prevId: null,
  nextId: null,
  stories: [],
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
      const { focusId, storyId } = action.payload;
      state.focusId = focusId;
      state.stories = getStories(focusId, state.diograph);
      state.storyId =
        storyId || (state.stories[0] && state.stories[0].id) || null;
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
  },
});

export const { setFocus, setStory, setDiograph } = diorySlice.actions;
export default diorySlice.reducer;
