import { Component, Output, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { observed } from '@libertyware/core';
import { BehaviorSubject } from 'rxjs';
import { distinct, filter } from 'rxjs/operators';
import { ENTER, hasModifierKey, SPACE } from '@angular/cdk/keycodes';
import { DetailsAnimations } from './detail.animations'

let uniqueId = 0;

@Component({
  selector: 'liberty-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['./details.scss'],
  animations: [DetailsAnimations.bodyExpansion, DetailsAnimations.indicatorRotate],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent {

  @Input()
  set expanded(value: boolean) {
    this.stateChange.next({
      isOpened: value
    });
  }

  @Output()
  @observed()
  stateChange: BehaviorSubject<{ isOpened: boolean }> = new BehaviorSubject({ isOpened: false });

  @Output()
  opened = this.stateChange.pipe(distinct(), filter(state => state.isOpened));

  @Output()
  closed = this.stateChange.pipe(distinct(), filter(state => !state.isOpened));

  ariaHeaderId = `details-control-${uniqueId++}`;
  ariaBodyId = `details-summary-${uniqueId++}`;

  get expandedState() {
    return this.stateChange?.value?.isOpened ? 'expanded' : 'collapsed';
  }

  keydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this.toggle();
        }

        break;
      default:
        return;
    }
  }

  toggle() {
    this.stateChange.next({
      isOpened: !this.stateChange?.value?.isOpened
    })
  }

}
