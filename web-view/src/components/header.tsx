import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { VscBellDot, VscBell } from "react-icons/vsc";
import { BsCheck2All } from "react-icons/bs";
import { notificationsAPI } from "../services/api";

type Notification = {
  notification: {
    canceledAt: Date | null;
    category: string;
    content: string;
    id: string;
    readAt: Date | null;
    recipientId: string;
    createdAt: Date;
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
type HeaderProps = {};

export type HeaderHandle = {
  hideNotification: () => void;
};

const Header: React.ForwardRefRenderFunction<HeaderHandle, HeaderProps> = (_, ref) => {
  const notificationnRef = useRef();
  const [showNotification, setShowNotification] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    notificationsAPI
      .get("/from/da1f365e-501d-4242-aec6-e50bbcab8d45")
      .then((response) => {
        const data = response.data?.notifications as Array<Notification>;
        setNotifications(data);
        if (data.length > 0) {
          setHasNotification(true);
        } else {
          setHasNotification(false);
        }
      })
      .catch(() => {
        alert("Erro..");
      });
  }, []);

  function handleShowNotification() {
    setShowNotification((old) => !old);
  }

  function hideNotification() {
    if (showNotification) {
      setShowNotification(false);
    }
  }

  async function readNotification(notification: Notification) {
    notificationsAPI.patch(`${notification.notification.id}/read`);
    setNotifications((old) =>
      old.filter((item) => item.notification.id !== notification.notification.id),
    );
  }

  useImperativeHandle(ref, () => ({
    hideNotification,
  }));

  return (
    <header>
      <h1>Logo</h1>
      <div className="notification-wrapper" ref={notificationnRef}>
        {hasNotification ? (
          <VscBellDot onClick={handleShowNotification} color="#fff" size={24} cursor="pointer" />
        ) : (
          <VscBell onClick={handleShowNotification} color="#fff" size={24} cursor="pointer" />
        )}
        {showNotification && (
          <ul className="notifications">
            {notifications.map((item) => (
              <li className="notification-item" key={item.notification.id}>
                <div>
                  <p>{item.notification.content}</p>
                  <small>
                    {item.notification.category} - {item.notification.createdAt.toString()}
                  </small>
                </div>
                <BsCheck2All cursor="pointer" onClick={() => readNotification(item)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default forwardRef(Header);
