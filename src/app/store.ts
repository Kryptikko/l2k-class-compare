import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import classSearchReducer from '../features/classSearch/classSearchSlice';
import skillListReducer from '../features/skillList/SkillListSlice';

export const store = configureStore({
  reducer: {
    skillList: skillListReducer,
    classSearch: classSearchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
