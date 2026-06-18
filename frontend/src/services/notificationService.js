import API from "../api/api";

export const getNotifications = () => {
  return API.get("/notifications", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "token"
      )}`,
    },
  });
};

export const createNotification = (
  notificationData
) => {
  return API.post(
    "/notifications",
    notificationData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );
};

export const markNotificationRead = (
  id
) => {
  return API.put(
    `/notifications/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );
};

export const deleteNotification = (
  id
) => {
  return API.delete(
    `/notifications/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );
};