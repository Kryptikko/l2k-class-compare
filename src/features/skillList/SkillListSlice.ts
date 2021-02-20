import { createAsyncThunk ,createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import axios from 'axios';

interface IState {
  skills: string[];
  isLoading: boolean;
}

const initialState: IState = {
  skills: [],
  isLoading: false,
};

export const reducer = createSlice({
  name: 'skillList',
  initialState,
  reducers: {
    load: state => {
      state.isLoading = true;
    },
  },
});

export const { load } = reducer.actions;

// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const loadSkills = createAsyncThunk<string[], undefined>('LOAD_SKILLS', async () => {
  console.log('loadSkills');
  const res = await axios.get('http://51.81.32.185/l2knight_info/skills_pts/class_5.html');
  return res.data;
})

export const skillSelector = (state: RootState) => state.skillList.skills;

export default reducer.reducer;
