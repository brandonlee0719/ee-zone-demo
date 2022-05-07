import { ApplicationRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getStrategies } from '@rx-angular/template';
import { ConfigService, RenderStrategy } from '@libertyware/core';
import { filter } from 'rxjs/operators';
import { FAQ, FAQS } from './interfaces/faq.interface';
import { RxState } from '@rx-angular/state';
import { FAQService } from './services/faq.service';

interface FAQState {
  faqs: FAQS;
}

@Component({
  selector: 'liberty-examples-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  strategies = Object.keys(getStrategies({ cdRef: { context: {} } } as any));

  readonly faqs$ = this.state.select('faqs');

  constructor(
    router: Router,
    appRef: ApplicationRef,
    public configService: ConfigService,
    private state: RxState<FAQState>,
    private faqService: FAQService
  ) {
    configService.setStrategy(RenderStrategy.local);
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => appRef.tick());

    this.state.connect('faqs', this.faqService.FAQS());
  }

  trackFAQ(idx: number, faq: FAQ): number {
    return faq.id;
  }
}
