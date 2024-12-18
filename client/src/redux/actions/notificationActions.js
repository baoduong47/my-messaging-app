import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const getNotifications = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "GET_NOTIFICATIONS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_NOTIFICATIONS_FAIL", payload: error.message });
  }
};

export const newNotification = (notification) => ({
  type: "RECEIVE_NOTIFICATIONS_SUCCESS",
  payload: notification,
});

export const deleteNotifications = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${apiUrl}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "DELETE_NOTIFICATIONS_SUCCESS" });
    dispatch(getNotifications());
  } catch (error) {
    dispatch({ type: "DELETE_NOTIFICATIONS_FAIL", payload: error.message });
  }
};

export const markNotificationsAsRead = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${apiUrl}/notifications/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: "MARK_NOTIFICATIONS_READ_SUCCESS",
      payload: response.data,
    });
    dispatch(getNotifications());
  } catch (error) {
    dispatch({ type: "MARK_NOTIFICATIONS_READ_FAIL", payload: error.message });
  }
};
