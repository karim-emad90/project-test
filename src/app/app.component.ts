import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angularProjectTest';

  fullTime: string = '';
value: any;

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
