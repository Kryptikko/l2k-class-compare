import _ from 'lodash';
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ISkill {
  "Casting Time": number;
  "Description": string;
  "HP cost": number;
  "Icon": string;
  "Level": number;
  "MP cost": number;
  "Name": string;
  "Range": number;
  "Type": string;
}

interface ILevelRange {
  lvl: number;
  skills: ISkill[]
}

export interface IClassData {
  className: string;
  classID: number;
  skillList: ILevelRange[];
}

interface IState {
  classList: {[key:string]: IClassData}
  isLoading: boolean;
}

const initialState: IState = {
  classList: {},
  isLoading: false,
};

export const loadSkills = createAsyncThunk<IClassData, string>('LOAD_CLASS_SKILL', async (className) => {
  const res = await axios.get(`/output/${className}.json`);
  return res.data;
})

export const reducer = createSlice({
  name: 'skillList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadSkills.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadSkills.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(loadSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.classList[action.payload.className] = action.payload
      })
  }
});

export const skillSelector =
  (className: string) =>
    (state: RootState) =>
       state.skillList.classList[className]

const dedupeClassSkills = (classData: IClassData) => _
  .chain(classData.skillList)
  .map('skills')
  .flatten()
  .filter((o) => !!o.Name)
  .sortBy(['Level'])
  .uniqBy('Name')
  .value()

export const selectLoading = (state: RootState) => state.skillList.isLoading


export const selectDifference = (cl1: string, cl2: string | undefined) =>
  (state: RootState) => {

    let classData1:ISkill[] = [],
      classData2:ISkill[] = [];

    if(state.skillList.classList[cl1])
      classData1 = dedupeClassSkills(state.skillList.classList[cl1])

    if(cl2 && state.skillList.classList[cl2])
      classData2 = dedupeClassSkills(state.skillList.classList[cl2])

    return _.differenceBy(
      classData1,
      classData2,
      'Name');
  }

export default reducer.reducer;
