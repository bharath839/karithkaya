import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlagsUiService } from 'src/app/flags-ui.service';
import { RabbitmqService } from 'src/app/rabbitmq.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;
version:any='';
  constructor(public login: LoginService,
    public use:UserService,
    private websocketService: RabbitmqService,
    private flagService: FlagsUiService
  
  ) {}



colour:any='pink'
color:any = 'red';

  // message: string = '';
  type: 'success' | 'error' | 'info' | 'warning' = 'info';
  visible: boolean = false;

  private subscription!: Subscription;
    showNotification : boolean = false;
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
      this.visible = true;
      if(msg){
       this.showNotification=true;
      }setTimeout(() => {
       
      }, 3000);
    });



     this.flagService.currentMessage$.subscribe(data => {
      this.colour = data;
    });
  }


triggerNotification() {
  console.log('!!!!!!!!!!!'+ this.visible);

  // this.message = 'Data saved successfully!';
  this.type = 'success';
  this.showNotification= !this.showNotification;
//  this.showNotification=!this.visible;
 setTimeout(() => {
  
  // this.visible=!this.visible;
    
  console.log('Timeout!');
}, 1000);
}


  public logout() {
    this.login.logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }
    ngOnDestroy() {
    this.subscription.unsubscribe();
    this.websocketService.disconnect();
  }
}
