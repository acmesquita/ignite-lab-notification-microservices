/* eslint-disable @typescript-eslint/ban-types */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { VscBellDot, VscBell } from "react-icons/vsc";
import { BsCheck2All, BsCheck } from "react-icons/bs";
import { getNotificationsToRecipient, markToRead } from "../services/notificationApi";
import { Notification } from "../types/notification";

type HeaderHandle = {
  hideNotification: () => void;
};

const Header: React.ForwardRefRenderFunction<HeaderHandle, {}> = (_, ref) => {
  const notificationnRef = useRef();
  const [showNotification, setShowNotification] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getNotificationsToRecipient()
      .then((notifications) => {
        setNotifications(notifications);
        handleHasNotification(notifications);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  function handleHasNotification(notifications: Notification[]) {
    const hasNoReadNotification =
      notifications.filter((item) => !item.notification.readAt).length > 0;
    setHasNotification(hasNoReadNotification);
  }

  function handleShowNotification() {
    setShowNotification((old) => !old);
  }

  function hideNotification() {
    if (showNotification) {
      setShowNotification(false);
    }
  }

  async function readNotification(notification: Notification) {
    markToRead(notification.notification.id).then(() => {
      setNotifications((old) =>
        old.map((item) => {
          if (item.notification.id === notification.notification.id) {
            item.notification.readAt = new Date();
          }
          return item;
        }),
      );
    });
  }

  useImperativeHandle(ref, () => ({
    hideNotification,
  }));

  return (
    <header>
      <h1>Logo</h1>
      <div
        className="notification-wrapper"
        ref={notificationnRef as unknown as React.RefObject<HTMLDivElement>}
      >
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
                {Boolean(item.notification.readAt) ? (
                  <BsCheck2All color="ligthblue" />
                ) : (
                  <BsCheck cursor="pointer" onClick={() => readNotification(item)} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default forwardRef(Header);
