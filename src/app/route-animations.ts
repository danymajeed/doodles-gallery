import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
  state,
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),

    group([
      query(':leave', [animate(200, style({ opacity: 0 }))], {
        optional: true,
      }),
      query(
        ':enter',
        [style({ opacity: 0 }), animate(100, style({ opacity: 1 }))],
        { optional: true }
      ),
    ]),
  ]),
]);
