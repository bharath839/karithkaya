import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RabbitmqService } from '../rabbitmq.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NotificationComponent implements OnInit {
  messages: string[] = [];
  newMessage = '';
  checkUorA: boolean = false;

  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() visible: boolean = false;

  history: string;
  hflag: boolean = false;
  visibleMessages: string[] = [];

  // Toast variables
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' | 'warning' = 'info';
  private toastTimeout: any;

  constructor(
    private websocketService: RabbitmqService,
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.history = 'See all messages from Redis memory';
    const check = localStorage.getItem('username');
    if (check === 'admin') this.checkUorA = true;

    this.websocketService.messageStream$.subscribe((msg: string) => {
      this.messages.push(msg);
      this.updateVisibleMessages();
      this.showToast(msg, 'info');
    });
  }

  toggleVisibility() {
    this.visible = !this.visible;
  }

  hide() {
    this.visible = false;
  }

  getHistory() {
    this.hflag = !this.hflag;
    this.history = this.hflag ? 'Hide all from Redis memory' : 'See all messages from Redis memory';

    this.http.get(`${this.configService.rabbitmq_url}/api/messages/history`, { responseType: 'text' })
      .subscribe((response: any) => {
        this.messages = JSON.parse(response);
        this.updateVisibleMessages();
      });
  }

  updateVisibleMessages() {
    this.visibleMessages = this.hflag ? this.messages : this.messages.slice(-2);
  }

  sendMessage(event: Event) {
    event.preventDefault();
    if (!this.newMessage.trim()) return;

    this.http.post(`${this.configService.rabbitmq_url}/api/messages/send`, this.newMessage, { responseType: 'text' })
      .subscribe(() => {
        this.newMessage = '';
      });
  }

  // Toast notification method
  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;

    if (this.toastTimeout) clearTimeout(this.toastTimeout);

    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

  // Optional backward compatibility for old calls
  showNotificationWithTimeout(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.showToast(message, type);
  }
}
