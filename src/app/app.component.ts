import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from './interfaces/icard';
import { TradeService } from './services/trade.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'card-trading';

  card$: Observable<Card>;
  showAlert = false;

  constructor(private tradeService: TradeService) {
    this.card$ = this.tradeService.getCard();
  }

  ngOnInit(): void {}

  async acceptTrade(tradeId: number): Promise<void> {
    try {
      await this.tradeService.acceptTrade(tradeId);
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 8000);
    } catch (error) {
      console.error('Failed to accept trade:', error);
    }
  }

  rejectTrade(tradeId: number): void {}
}
