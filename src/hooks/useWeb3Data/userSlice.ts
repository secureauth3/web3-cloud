import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUser } from './userAPI';

export interface UserState {
  account: string;
  dappName: string;
  permissionFlags: number;
  email: string;
  firstName: string;
  lastName: string;
  ens: string;
  startDate: number;
  chainId: number;
  accessToken: string;
  status: 'idle' | 'loading' | 'failed'
}
  
const initialState: UserState = {
  account: '',
  dappName: '',
  permissionFlags: 0,
  email: '',
  firstName: '',
  lastName: '',
  ens: '',
  startDate: 0,
  chainId: 0,
  status: 'idle',
  accessToken: '',
};

export const fetchUserById = createAsyncThunk(
  'user/fetchUser',
  async (data: {account: string, accessToken:string, apiKey: string}) => {
    const response = await fetchUser(data.account, data.accessToken, data.apiKey);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccesToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.account = action.payload.account;
      state.dappName = action.payload.dappName;
      state.permissionFlags = action.payload.permissionFlags;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.ens = action.payload.ens;
      state.startDate = action.payload.startDate;
      state.chainId = action.payload.chainId;
    },
    signOutAccount: (state) => {
      state.account = '';
      state.dappName = '';
      state.permissionFlags = 0;
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.ens = '';
      state.startDate = 0;
      state.chainId = 0;
      state.accessToken = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.account = action.payload.account;
        state.dappName = action.payload.dappName;
        state.permissionFlags = action.payload.permissionFlags;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.ens = action.payload.ens;
        state.startDate = action.payload.startDate;
        state.chainId = action.payload.chainId;  
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.account = '';
        state.dappName = '';
        state.permissionFlags = 0;
        state.email = '';
        state.firstName = '';
        state.lastName = '';
        state.ens = '';
        state.startDate = 0;
        state.chainId = 0;
        state.accessToken = '';
      })
  }
});

// Selectors
export const selectAccount = (state: RootState) => state.user.account;
export const selectEmail = (state: RootState) => state.user.email;
export const selectEns = (state: RootState) => state.user.ens;
export const selectFirstName = (state: RootState) => state.user.firstName;
export const selectLastName = (state: RootState) => state.user.lastName;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectDappName = (state: RootState) => state.user.dappName;
export const selectStartDate = (state: RootState) => state.user.startDate;
export const selectChainId = (state: RootState) => state.user.chainId;
export const selectPermissionFlags= (state: RootState) => state.user.permissionFlags;

// Actions
export const { 
  setUser,
  signOutAccount,
  setAccesToken,
} = userSlice.actions;

export default userSlice.reducer;
