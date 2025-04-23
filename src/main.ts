import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-root',
  imports: [ListComponent],
  template: `
   <app-list />
  `,
})
export class App {

}

bootstrapApplication(App, 
  {
    providers: [
      provideHttpClient()
    ]
  }
);
