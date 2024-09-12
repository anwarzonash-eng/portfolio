import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface IProfileState {
  listOfProfileData: any;
  profileLoading: boolean;
  profileUrlInfo: any;
}

const initialState: IProfileState = {
  listOfProfileData: null,
  profileLoading: true,
  profileUrlInfo: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setListOfProfileData: (state, action: PayloadAction<any>) => {
      state.listOfProfileData = action.payload;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.profileLoading = action.payload;
    },
    setProfileUrlInfo: (state, action: PayloadAction<any>) => {
      state.profileUrlInfo = action.payload;
    },
  },
});

export const { setListOfProfileData, setProfileLoading, setProfileUrlInfo } =
  profileSlice.actions;
export const profileReducer = profileSlice.reducer;
