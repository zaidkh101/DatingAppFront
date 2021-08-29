export interface Message {
    id: string;
    senderId: number;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientId: number;
    recipientUsername: string;
    recipientPhotoUrl?: string;
    content: string;
    dateRead?: Date;
    messageSent: Date;
}