import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'liberty-summary',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SummaryComponent {}
