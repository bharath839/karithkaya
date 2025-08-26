import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fullText: string = `
<h1>Welcome to the Exam Portal!</h1>

<h2>This system helps manage:</h2>
- Students
- Exams
- Results
- Reports
we take the Exam and Imporve our knowlege .
This Application we helps to develop the skils and helps improve our skills and talents .
For exams its is best choice to prepare.
Easily track and manage all data in one place.
  `;

  typedText: string = ""; // will hold the text being typed
  i: number = 0;          // pointer to current character

  constructor() {}

  ngOnInit(): void {
    this.typingEffect();
  }

  typingEffect() {
    if (this.i < this.fullText.length) {
      this.typedText += this.fullText.charAt(this.i);
      this.i++;
      setTimeout(() => this.typingEffect(), 50); // typing speed
    }
  }
}
