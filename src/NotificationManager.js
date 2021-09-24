import { NotificationManager } from "react-notifications";

const NotificationsAlert = (type, title, subtitle="") => {
  switch (type) {
    case "info":
      NotificationManager.info("Info message");
      break;
    case "success":
      NotificationManager.success(subtitle, title);
      break;
    case "warning":
      NotificationManager.warning(
        "Warning message",
        "Close after 3000ms",
        3000
      );
      break;
    default:
      NotificationManager.error("Error message", "Click me!", 5000);
      break;
  }
};

export default NotificationsAlert;