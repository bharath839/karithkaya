import { Component, OnInit } from '@angular/core';
import { FlagsUiService } from 'src/app/flags-ui.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
show:boolean=false
  constructor(public login: LoginService,
     public use:UserService,
        private flagService: FlagsUiService,
        private configService: ConfigService
  ) { }
  colour:any
view:boolean=false
  ngOnInit(): void {
this.show = this.configService.upload_img_enabled;
    
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
  }

  public logout() {
    this.login.logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }

}
