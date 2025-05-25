import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DioryInfo, getDioryInfo } from "../utils/dioryInfo";
import { Diograph } from "@diograph/diograph";
import { HttpClient } from "@diograph/http-client";
import { validateDiograph } from "@diograph/diograph/validator";
import { IDiographObject } from "@diograph/diograph/types";
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
}

const initialState: DioryState = {
  diograph: null,
  focusId: null,
  storyId: null,
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
    },
    // setStoryDiory allows updating just the story piece of the state.
    setStoryDiory(state, action: PayloadAction<any>) {
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

export const { setFocus, setStoryDiory, setDiograph } = diorySlice.actions;
export default diorySlice.reducer;
