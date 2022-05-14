import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'store-frontend';
  disableHeader : boolean = false

  constructor(private router: Router, private location: Location){
      const path : string = this.location.path();
    }
  
  ChangeDisableHeader(flag : boolean) : void {
    this.disableHeader = flag;
  }
  
}
