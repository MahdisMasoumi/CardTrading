import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../interfaces/icard';
import { Trade } from '../interfaces/itrade';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private cardSubject = new BehaviorSubject<Card>({
    id: '123',
    name: '1999 KOBE BRYANT SKYBOX E-X PSA 10',
    status: 'available',
    currentTrades: [],
  });

  constructor() {
    this.updateTrades([
      {
        id: 1,
        userId: '1',
        username: 'Alex',
        cardId: '123',
        offering: '500$',
        status: 'pending',
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: '2',
        username: 'Sarah',
        cardId: '123',
        offering: '550$',
        status: 'pending',
        createdAt: new Date(),
      },
      {
        id: 3,
        userId: '3',
        username: 'Mike',
        cardId: '123',
        offering: '530$',
        status: 'pending',
        createdAt: new Date(),
      },
    ]);
  }

  getCard(): Observable<Card> {
    return this.cardSubject.asObservable();
  }

  private updateTrades(trades: Trade[]): void {
    const currentCard = this.cardSubject.value;
    this.cardSubject.next({
      ...currentCard,
      currentTrades: trades,
    });
  }

  async acceptTrade(tradeId: number): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const currentCard = this.cardSubject.value;
      const updatedTrades = currentCard.currentTrades.map((trade) => {
        let newStatus: 'pending' | 'completed' | 'cancelled';
        if (trade.id === tradeId) {
          newStatus = 'completed';
        } else {
          newStatus = 'cancelled';
        }

        return {
          ...trade,
          status: newStatus,
        };
      });

      this.cardSubject.next({
        ...currentCard,
        status: 'traded',
        currentTrades: updatedTrades,
      });
    } catch (error) {
      console.error('Error accepting trade:', error);
      throw error;
    }
  }
}
