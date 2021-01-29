import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

type NotificationData = {
  severity: "error" | "warning" | "info" | "success" | "";
  message: string;
};

const initialState: NotificationData = {
  severity: "",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setNotifcation(state, action: PayloadAction<NotificationData>) {
      const {severity, message} = action.payload;
      state.message = message;
      state.severity = severity;

      renderToast(action.payload);
    },
  },
});

const renderToast = (stuff: NotificationData) => {
  switch (stuff.severity) {
    case "success":
      toast.success(stuff.message);
      break;
    case "warning":
      toast.warning(stuff.message);
      break;
    case "error":
      toast.error(stuff.message);
      break;
    case "info":
      toast.info(stuff.message);
      break;
    default:
      toast.dark(stuff.message);
      break;
  }
};

export const {setNotifcation} = notificationSlice.actions;

export default notificationSlice.reducer;
