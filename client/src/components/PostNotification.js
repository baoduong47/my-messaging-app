import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { deleteNotifications } from "../redux/actions/notificationActions";

const PostNotification = ({ notifications, isOpen }) => {
  // useEffect(() => {
  //   console.log("notifications in postNotifications", notifications);
  // }, [notifications]);

  const dispatch = useDispatch();
  const handleClearNotifications = () => {
    dispatch(deleteNotifications());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-72 right-40 bg-white shadow-lg rounded-lg w-80 p-4 border border-gray-300"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          Notifications
        </h3>
        <button
          onClick={handleClearNotifications}
          className="text-sm text-gray-600 transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      <ul className="space-y-3 overflow-y-auto" style={{ maxHeight: "200px" }}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification._id}
              className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={
                    notification.replier
                      ? `http://localhost:3000/${notification.replier.avatar}`
                      : "default-avatar-url"
                  }
                  alt="Replier Avatar"
                  className="w-9 h-9 border border-gray-200 rounded-full object-cover"
                />
                <div className="text-sm text-gray-700">
                  {notification.type === "like" ? (
                    <div>
                      <strong>{notification.message}</strong>{" "}
                      <span>liked to your comment.</span>
                    </div>
                  ) : (
                    <div>
                      <strong>{notification.message}</strong>{" "}
                      <span>replied to your comment.</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex-1 mt-1 text-ellipsis overflow-hidden">
                  {notification.type === "comment" && (
                    <em>"{notification.replyContent}"</em>
                  )}
                </div>
                <div className="text-xs text-gray-600 mt-2 text-right">
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-700 bg-gray-100 p-3 rounded-md text-center">
            No new notifications
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default PostNotification;