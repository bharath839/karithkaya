import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlagsUiService } from 'src/app/flags-ui.service';
import { RabbitmqService } from 'src/app/rabbitmq.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotificationComponent } from '../../notification/notification.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    NotificationComponent, // Re-added NotificationComponent
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;

  isLoggedIn = false;
  user = null;
version:any='';
  constructor(public login: LoginService,
    public use:UserService,
    private websocketService: RabbitmqService,
    private flagService: FlagsUiService,
    private router: Router 
  
  ) {}



colour:any='pink'
color:any = 'red';

  // message: string = '';
  type: 'success' | 'error' | 'info' | 'warning' = 'info';
  // Removed: visible: boolean = false; 

  private subscription!: Subscription;
  // Removed: showNotification : boolean = false; 
// message = 'Operation successful';

// type = 'success';
  ngOnInit(): void {


      this.flagService.initColorOnce(); 
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
 
 



    this.use.getVersion().subscribe((ver) => {
      console.log(ver)
      this.version = ver;
    });

   const isFirstLoad = sessionStorage.getItem('colorFetched') !== 'true';

  if (isFirstLoad) {
    // Fetch from API only on first load
    this.use.getActiveColor().subscribe(
      (data: any) => {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        this.colour = parsed.color;
        console.log("Color fetched from API:", this.colour);
        // Save flag to avoid future API calls
        sessionStorage.setItem('colorFetched', 'true');
        // Emit color to shared service
        this.flagService.setColor(parsed);
      },
      (error) => {
        console.error("Error fetching color from API:", error);
        this.colour='pink'
      }
    );
  }

  // Always subscribe to observable for updates
  this.flagService.getcolor.subscribe(
    (data: any) => {
             console.log("Color updated from observable:", this.colour);
      if (data && data.color) {
        this.colour = data.color;
        console.log("Color updated from observable:", this.colour);
      }
    }
  );




// this.flagService.getcolor((data:any)=>{
//       this.color=JSON.parse(data).color     
//     })
  

     this.websocketService.connect();

    this.subscription = this.websocketService.messageStream$.subscribe((msg) => {
      // this.message = msg;
      this.type = 'info'; // Or parse based on backend message
      // Removed: this.visible = true;
      if(msg){
        // Removed: this.showNotification=true;
        this.notificationComponent.showNotificationWithTimeout(msg, this.type); // Call method on NotificationComponent
      }
      // Removed: setTimeout(() => {
      // Removed: }, 3000);
    });



    this.flagService.currentMessage$.subscribe(data => {
      this.colour = data;
    });
  }


  triggerNotification() {
    // Removed: console.log('!!!!!!!!!!!'+ this.visible);

    // Removed: this.message = 'Data saved successfully!';
    this.type = 'success';
    // Removed: this.showNotification= !this.showNotification;
    // Removed: //  this.showNotification=!this.visible;
    // Removed: setTimeout(() => {
    // Removed: //  this.visible=!this.visible;
    // Removed: //  console.log('Timeout!');
    // Removed: }, 1000);
    this.notificationComponent.toggleVisibility(); // Call toggle method on NotificationComponent
  }


  public logout() {
    this.login.logout();
    // window.location.reload();
      this.router.navigate(['/home']); 
    this.login.loginStatusSubject.next(false);
  }
    ngOnDestroy() {
    this.subscription.unsubscribe();
    this.websocketService.disconnect();
  }
}
