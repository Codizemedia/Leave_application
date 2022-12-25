import {
  Component,
  Input,
  OnDestroy,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-spinner',
  template: `<div class="preloader" *ngIf="isSpinnerVisible">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
    </div>`,
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  public isSpinnerVisible = true;
  

  @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)';

  constructor(
    public sharedService: SharedService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    // || (this.sharedService.loadSpinner)
    this.router.events.subscribe(
      event => {
        if ((event instanceof NavigationStart) || (this.sharedService.loadSpinner)) {
          this.isSpinnerVisible = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }
}
