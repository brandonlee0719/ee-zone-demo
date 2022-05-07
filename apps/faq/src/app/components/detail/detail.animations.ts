import { AnimationTriggerMetadata, trigger, state, style, transition, animate } from "@angular/animations";

export const ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const DetailsAnimations: {
  readonly indicatorRotate: AnimationTriggerMetadata;
  readonly bodyExpansion: AnimationTriggerMetadata;
} = {
  /** Animation that rotates the indicator arrow. */
  indicatorRotate: trigger('indicatorRotate', [
    state('collapsed, void', style({ transform: 'rotate(0deg)' })),
    state('expanded', style({ transform: 'rotate(45deg)' })),
    transition('expanded <=> collapsed, void => collapsed',
      animate(ANIMATION_TIMING)),
  ]),
  /** Animation that expands and collapses the panel content. */
  bodyExpansion: trigger('bodyExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition('expanded <=> collapsed, void => collapsed',
      animate(ANIMATION_TIMING)),
  ])
};
