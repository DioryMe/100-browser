import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DioryInfo, getDioryInfo } from "../utils/dioryInfo";
import { Diograph } from "@diograph/diograph";
import { HttpClient } from "@diograph/http-client";
import { validateDiograph } from "@diograph/diograph/validator";

// Thunk action to asynchronously load the diograph
export const loadDiograph = createAsyncThunk("diory/loadDiograph", async () => {
  const httpClient = new HttpClient("http://diory-demo-content.surge.sh");
  const diographContents = await httpClient.readTextItem("diograph.json");
  const diographJson = JSON.parse(diographContents);
  validateDiograph(diographJson);
  return new Diograph(diographJson);
});

// Define the initial state using the DioryInfo shape
interface DioryState extends DioryInfo {}

const initialState: DioryState = {
  diograph: null,
  // Using default focus "/" until overwritten via setFocus
  focusId: "/",
  storyId: null,
  story: null,
  stories: [],
  prev: null,
  next: null,
  focus: {
    text: null,
    image: null,
    latlng: null,
    date: null,
    links: [],
    linkedDiories: [],
    data: null,
  },
  focusDiory: null,
  relatedGeo: [],
  relatedTime: [],
  relatedStories: [],
  delete: null,
  link: null,
  edit: null,
};

const diorySlice = createSlice({
  name: "diory",
  initialState,
  reducers: {
    // setFocus will update the DioryInfo state using getDioryInfo with the new focus id.
    setFocus(
      state,
      action: PayloadAction<{ focusId: string; storyId?: string | null }>
    ) {
      if (state.diograph) {
        const { focusId, storyId } = action.payload;
        const info = getDioryInfo(state.diograph, focusId, storyId);
        // Copy over all fields from info into the state
        state.focusId = info.focusId;
        state.storyId = info.storyId;
        state.story = info.story;
        state.stories = info.stories;
        state.prev = info.prev;
        state.next = info.next;
        state.focus = info.focus;
        state.focusDiory = info.focusDiory;
        state.relatedGeo = info.relatedGeo;
        state.relatedTime = info.relatedTime;
        state.relatedStories = info.relatedStories;
        state.delete = info.delete;
        state.link = info.link;
        state.edit = info.edit;
      }
    },
    // setStoryDiory allows updating just the story piece of the state.
    setStoryDiory(state, action: PayloadAction<any>) {
      state.story = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadDiograph.fulfilled,
      (state, action: PayloadAction<Diograph>) => {
        state.diograph = action.payload;
        // Once loaded, initialize the state with a default focus ("/")
        const info = getDioryInfo(action.payload, "/");
        state.focusId = info.focusId;
        state.storyId = info.storyId;
        state.story = info.story;
        state.stories = info.stories;
        state.prev = info.prev;
        state.next = info.next;
        state.focus = info.focus;
        state.focusDiory = info.focusDiory;
        state.relatedGeo = info.relatedGeo;
        state.relatedTime = info.relatedTime;
        state.relatedStories = info.relatedStories;
        state.delete = info.delete;
        state.link = info.link;
        state.edit = info.edit;
      }
    );
  },
});

export const { setFocus, setStoryDiory } = diorySlice.actions;
export default diorySlice.reducer;
