
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy


} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';


import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserDetails } from 'src/app/views/store/user-details/user-details.selectors';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green = false;
  blue = false;
  dark = false;
  minisidebar = false;
  boxed = false;
  danger = false;
  showHide = false;
  url = '';
  sidebarOpened = false;
  status = false;
  userName:string = ""; 

  public showSearch = false;

  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;
  userDetailsSubscription!: Subscription;

  clickEvent() {
    this.status = !this.status;
  }


  constructor(
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private store: Store,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);

    this .userDetailsSubscription = this.store.select(selectUserDetails).subscribe((response)=>{
      // console.log("see header logs", response)
      if(response.userDetails != undefined){
        this.userName = response.userDetails[0].name
      }
    })
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);

   
  }


  // Mini sidebar
}
