import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type IClass = {
  className: string;
  classID: string;
}

interface IState {
  index: IClass[];
  selection: IClass[];
  isLoading: boolean;
}

const initialState: IState = {
  index: [],
  isLoading: false,
  selection: [],
};


export const loadIndex = createAsyncThunk<IClass[], undefined>('LOAD_CLASS_INDEX', async () => {
  const res = await axios.get('/output/index.json');
  return res.data as IClass[];
})


export const reducer = createSlice({
  name: 'classSearch',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<IClass[]>) => {
      let selection = action.payload
      if (selection.length > 2)
        selection = selection.slice(selection.length-2);
      state.selection = selection
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadIndex.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadIndex.fulfilled, (state, action) => {
        state.index = action.payload
          .filter(cl => cl.classID !== '0')
          .filter(cl =>!['Undefined id', 'unknown'].includes(cl.className));
        state.isLoading = false;
      })
      .addCase(loadIndex.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const { select } = reducer.actions;
export const selectClasses = (state: RootState) => state.classSearch.index;
export const selectSelection = (state: RootState) => state.classSearch.selection

export default reducer.reducer;
