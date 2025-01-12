import React, { useState } from 'react';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: 'New Reservation',
      description: 'A new reservation has been made for room 101.',
      time: '12:00 PM',
      date: 'Jan 12',
      isRead: false,
    },
    {
      id: 2,
      title: 'Room Service Request',
      description: 'A room service request has been submitted for room 202.',
      time: '9:45 AM',
      date: 'Jan 11',
      isRead: true,
    },
    {
      id: 3,
      title: 'Payment Confirmation',
      description: 'Payment has been successfully processed for room 305.',
      time: '8:30 PM',
      date: 'Jan 10',
      isRead: false,
    },
    {
      id: 4,
      title: 'Room Cleaning',
      description: 'Room 102 is ready for cleaning.',
      time: '2:00 PM',
      date: 'Jan 9',
      isRead: false,
    },
    {
      id: 5,
      title: 'Guest Feedback',
      description: 'A guest has submitted feedback for room 305.',
      time: '4:30 PM',
      date: 'Jan 8',
      isRead: true,
    },

  ];

  const [notificationList, setNotificationList] = useState(notifications.slice(0, 3));
  const [visibleCount, setVisibleCount] = useState(3); 
  const markAsRead = (id) => {
    const updatedNotifications = notificationList.map((notif) =>
      notif.id === id ? { ...notif, isRead: true } : notif
    );
    setNotificationList(updatedNotifications);
  };

  
  const markAsUnread = (id) => {
    const updatedNotifications = notificationList.map((notif) =>
      notif.id === id ? { ...notif, isRead: false } : notif
    );
    setNotificationList(updatedNotifications);
  };


  const loadMoreNotifications = () => {
    const nextVisibleCount = visibleCount + 3; 
    setVisibleCount(nextVisibleCount);
    setNotificationList(notifications.slice(0, nextVisibleCount)); 
  };

  return (
   <>
      
      <div className="space-y-4">
        {notificationList.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-md shadow-sm border-l-4 ${
              notif.isRead ? 'border-gray-400 bg-gray-100' : 'border-primary bg-gray-200'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">{notif.date}</span>
              <span className="text-xs text-gray-500">{notif.time}</span>
            </div>

            <h3 className="font-semibold text-lg">{notif.title}</h3>
            <p className="text-sm text-gray-600">{notif.description}</p>
            <div className="flex justify-between items-center mt-2">
              <div className="space-x-2">
                {!notif.isRead && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="text-blue-500 text-sm"
                  >
                    Mark as Read
                  </button>
                )}
                {notif.isRead && (
                  <button
                    onClick={() => markAsUnread(notif.id)}
                    className="text-blue-500 text-sm"
                  >
                    Mark as Unread
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < notifications.length && (
        <div className=" mt-4">
          <button
            onClick={loadMoreNotifications}
            className=" text-secondary px-4 py-2 rounded-md"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default Notification;
