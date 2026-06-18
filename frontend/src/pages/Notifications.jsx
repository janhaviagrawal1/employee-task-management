import {
  useEffect,
  useState,
} from "react";

import {
  getNotifications,
  createNotification,
  markNotificationRead,
  deleteNotification,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const loadNotifications =
    async () => {
      try {
        setLoading(true);

        const response =
          await getNotifications();

        setNotifications(
          response.data.notifications || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleCreate =
    async () => {
      if (!message) return;

      try {
        setLoading(true);

        await createNotification({
          user: user.id || user._id,
          message,
        });

        setMessage("");

        await loadNotifications();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleRead =
    async (id) => {
      try {
        setLoading(true);

        await markNotificationRead(id);

        await loadNotifications();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      try {
        setLoading(true);

        await deleteNotification(id);

        await loadNotifications();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <h2>Notifications</h2>

      <input
        type="text"
        placeholder="Notification Message"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button
        onClick={handleCreate}
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : "Create Notification"}
      </button>

      <hr />

      {loading && (
        <h3>Loading...</h3>
      )}

      {!loading &&
        notifications.map(
          (notification) => (
            <div
              key={notification._id}
              style={{
                border:
                  "1px solid gray",
                margin: "10px",
                padding: "10px",
              }}
            >
              <p>
                {
                  notification.message
                }
              </p>

              <p>
                Status:
                {" "}
                {notification.isRead
                  ? "Read"
                  : "Unread"}
              </p>

              {!notification.isRead && (
                <button
                  disabled={loading}
                  onClick={() =>
                    handleRead(
                      notification._id
                    )
                  }
                >
                  Mark Read
                </button>
              )}

              <button
                disabled={loading}
                onClick={() =>
                  handleDelete(
                    notification._id
                  )
                }
              >
                Delete
              </button>
            </div>
          )
        )}
    </div>
  );
}

export default Notifications;