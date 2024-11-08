import { Trade } from './itrade';

export interface Card {
  id: string;
  name: string;
  status: 'available' | 'traded' | 'pending';
  currentTrades: Trade[];
}
