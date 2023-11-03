import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toDoFe';
  showSplash = true;

  ngOnInit() {
    // Simulate a delay to showcase the splash screen
    setTimeout(() => {
      this.showSplash = false;
    }, 4200); // Adjust the duration as per your requirements
  }
}
