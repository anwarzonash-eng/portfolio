import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProfileReport } from '@/types/api';
import type { RoutesInfo } from '@/hooks/url';

export interface IProfileState {
  /** Adjusted profile report for the current domain + unique id (null until loaded). */
  listOfProfileData: ProfileReport | null;
  profileLoading: boolean;
  profileUrlInfo: RoutesInfo | null;
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
    setListOfProfileData: (
      state,
      action: PayloadAction<ProfileReport | null>
    ) => {
      state.listOfProfileData = action.payload;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.profileLoading = action.payload;
    },
    setProfileUrlInfo: (state, action: PayloadAction<RoutesInfo | null>) => {
      state.profileUrlInfo = action.payload;
    },
  },
});

export const { setListOfProfileData, setProfileLoading, setProfileUrlInfo } =
  profileSlice.actions;
export const profileReducer = profileSlice.reducer;
