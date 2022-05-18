import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core'
import { Router } from '@angular/router'
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'store-frontend'
  
  constructor(
    private router: Router,
    private location: Location,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cd.detectChanges()
  }
}
