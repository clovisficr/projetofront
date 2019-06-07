import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bem Vindo a Angular';

  curso: string = 'Curso Spring 5 com Angular 7';

  professor: string = 'Clovis Lopes';
}
