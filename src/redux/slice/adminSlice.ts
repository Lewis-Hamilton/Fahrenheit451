import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminByUidResult, getAdminByUid } from "../../api/susanwabbajacksucksAPI";
import { AppThunk } from "../store";

type UserData = {
  admin: boolean;
  isLoading: boolean;
  error: string | null; 
};

let initialState: UserData = {
  admin: false,
  isLoading: false,
  error: null
}

function startLoading(state: UserData) {
  state.isLoading = true;
}

function loadingFailed(state: UserData, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    getAdminSuccess(state, { payload }: PayloadAction<AdminByUidResult>) {
      const { body } = payload;
      state.isLoading = false;
      state.error = null;
      state.admin = body;
    },
    getAdminFailure: loadingFailed,
    getAdminStart: startLoading
  },
});

export const { getAdminSuccess, getAdminFailure, getAdminStart } = adminSlice.actions;

export default adminSlice.reducer;

export const fetchAdmin = (uid: string): AppThunk => async (dispatch) => {
  try {
    dispatch(getAdminStart());
    const admin = await getAdminByUid(uid);
    dispatch(getAdminSuccess(admin));
  } catch (err) {
    dispatch(getAdminFailure(err.string()));
  }
};