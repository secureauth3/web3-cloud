import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../hooks/useWeb3Data/userSlice';
export const auth3Store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type AppDispatch = typeof auth3Store.dispatch;
export type RootState = ReturnType<typeof auth3Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
