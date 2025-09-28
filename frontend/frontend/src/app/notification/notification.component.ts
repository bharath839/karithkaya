import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RabbitmqService } from '../rabbitmq.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule] // Add CommonModule to imports
})
export class NotificationComponent implements OnInit {
  messages: string[] = [];
  newMessage = '';
  constructor(  private websocketService: RabbitmqService,private http: HttpClient, private configService: ConfigService) { }
  checkUorA:boolean=false;
  // message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() visible: boolean = false;
  history:any
  hflag:boolean=false
  visibleMessages: string[] = []; // w
  showAll: boolean = false;
  private timeoutHandle: any; // To store the timeout ID

  ngOnInit(): void {
    this.history = "See all messages from Redis memory";
let check=localStorage.getItem("username");

if(check=="admin"){
  this.checkUorA=true;
}

      //  this.websocketService.connect();

    this.websocketService.messageStream$.subscribe((msg: string) => {
      // this.visible =true; // Removed: control visibility through showNotificationWithTimeout
      this.messages.push(msg);
      this.updateVisibleMessages();
      this.showNotificationWithTimeout(msg, 'info'); // Show notification for incoming messages
    });
  }



  toggleVisibility() {
    this.visible = !this.visible;
    // Removed automatic hiding logic: setTimeout(..., 3000)
  }

  showNotificationWithTimeout(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    // Optionally, you can set the message and type dynamically here
    // this.message = message;
    this.type = type;
    this.visible = true;

    // Clear any previous timeout to prevent premature hiding
    clearTimeout(this.timeoutHandle);

    // Removed automatic hiding logic: this.timeoutHandle = setTimeout(() => { this.visible = false; }, 3000);
  }

  hide() {
    this.visible = false; // Directly hide the notification
    clearTimeout(this.timeoutHandle); // Clear any lingering timeout
  }

  getHistory(){
    this.hflag=!this.hflag;
  this.history = this.hflag ? "Hide all from Redis memory" : "See all messages from Redis memory";
    

 this.http.get(`${this.configService.rabbitmq_url}/api/messages/history`, {
      responseType: 'text'
    }).subscribe((respose:any) =>{
      this.messages=JSON.parse(respose);
  this.updateVisibleMessages();
      console.log(":::::::::::::"+respose);
       
    });
      

  }
updateVisibleMessages() {
  this.visibleMessages = this.hflag ? this.messages : this.messages.slice(-2);
}

 sendMessage(): void {
    if (!this.newMessage.trim()) return;
    this.http.post(`${this.configService.rabbitmq_url}/api/messages/send`, this.newMessage, {
      responseType: 'text'
    }).subscribe(() => this.newMessage = '');
     
  }

  
}
