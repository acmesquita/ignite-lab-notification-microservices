export type Notification = {
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
