import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit ,Renderer2} from '@angular/core';
import Swal from 'sweetalert2';
import { FlagsUiService } from '../flags-ui.service';
import { UserService } from '../services/user.service';
import { ConfigService } from '../services/config.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Assuming MatCardModule might be used

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class ImageUploadComponent implements OnInit {

    description = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  uploadedImages: string[] = [];
  dataLoadingError: boolean = false; // New flag for data loading errors

Colours:any= [] 

  constructor(private http: HttpClient,private renderer: Renderer2,private flagService: FlagsUiService,private userService:UserService, private configService: ConfigService) {
       this.fetchUploadedImages();
   
  }
  ngOnInit(): void {
        console.log("ImageUploadComponent: Initializing data...")
  this.userService.getBgColours().subscribe({
    next: (data:any)=>{
        console.log("ImageUploadComponent: Background colors fetched successfully.")
      this.Colours =JSON.parse(data) ;
    } ,
    error: (error) => {
      console.error("ImageUploadComponent Error fetching colors:", error);
      this.dataLoadingError = true;
    }
  });
  }

selectedColor: string | null = null;

isMaterialColor(color: string): boolean {
  return ['primary', 'accent', 'warn'].includes(color);
}



colour={color:""}

colourData:any
selectColor(color:any){

    this.flagService.setColor(color);



  
// this.flagService.setColor.subscribe((data:any)=>{
// console.log(":::::::imageui::::data"+data)
//     } , (error) => {
//       console.error("Error for activating color colors:", error);})

      this.selectedColor = color.color;
  }



// For display box
getColorStyle(color: string): any {
  return this.isMaterialColor(color)
    ? {
        border: '1px solid #999',
        padding: '10px',
        textAlign: 'center',
        width: '100px',
        height: '50px',
        cursor: 'pointer'
      }
    : {
        backgroundColor: color,
        color: this.getTextColor(color),
        border: '1px solid black',
        padding: '10px',
        textAlign: 'center',
        width: '100px',
        height: '50px',
        cursor: 'pointer'
      };
}

// Light/dark contrast helper
getTextColor(color: string | null): string {
  if (!color) return 'black'; // fallback for null/undefined
  const darkColors = ['black', 'blue', 'indigo', 'purple', 'brown', 'gray', 'teal'];
  return darkColors.includes(color.toLowerCase()) ? 'white' : 'black';
}
addColor(){

    
       let obj={
        "color": this.colourData,
        "active": false}
this.userService.addColor(obj).subscribe((data)=>{
  console.log("data"+data)
})
  console.log(this.colourData)





}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {
    if (!this.description || !this.selectedFile) {
      Swal.fire('Warning', 'Please fill all fields', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('description', this.description);
    formData.append('image', this.selectedFile);
   formData.append('isBackground', String(false)); 





    this.http.post(`${this.configService.image_url}/api/images/upload`, formData).subscribe({
      next: () => {
        Swal.fire('Success', 'Image uploaded successfully!', 'success');
        this.description = '';
        this.selectedFile = null;
        this.imagePreview = null;
      },
      error: () => {
        Swal.fire('Error', 'Image upload failed.', 'error');
      }
    });
  }
  imags:any=[];
fetchUploadedImages() {
  this.http.get<any[]>(`${this.configService.image_url}/api/images`).subscribe({
    next: (images: any[]) => {

this.imags=images
      this.uploadedImages = images.map(image => image); // Extract URLs into the array
      console.log("ImageUploadComponent: Loaded image URLs:", this.uploadedImages);
    },
    error: err => {
      console.error('ImageUploadComponent Failed to fetch images', err);
      this.dataLoadingError = true;
    }
  });
}

    setBackground(imageUrl: string) {
    this.renderer.setStyle(document.body, 'backgroundImage', `url('${imageUrl}')`);
    this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
    this.renderer.setStyle(document.body, 'backgroundPosition', 'center');
  }

setAsBackground(id: any) {
  const imageUrls = `${this.configService.image_url}/api/images/${id}`;

  this.http.post(`${this.configService.image_url}/images/set-background/${id}`, {})
    .subscribe(() => {
     
      Swal.fire('Success', 'Background set!', 'success');

      this.loadBackgroundImage(); // Optional if you want to reload with blob
    });

      this.renderer.setStyle(document.body, 'backgroundImage', `url('${imageUrls}')`);
      this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
      this.renderer.setStyle(document.body, 'backgroundPosition', 'center');


}

   
loadBackgroundImage() {
  this.http.get(`${this.configService.image_url}/api/images/background`, { responseType: 'blob' })
    .subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.renderer.setStyle(document.body, 'backgroundImage', `url('${imageUrl}')`);
        this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
        this.renderer.setStyle(document.body, 'backgroundPosition', 'center');
      };
      reader.readAsDataURL(blob);
    });
  }

sendData() {
    this.flagService.changeMessage({ msg: 'success' });
  }
}
