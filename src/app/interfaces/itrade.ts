export interface Trade {
  id: number;
  userId: string;
  username: string;
  cardId: string;
  offering: string;
  status: 'completed' | 'pending' | 'cancelled';
  createdAt: Date;
}
