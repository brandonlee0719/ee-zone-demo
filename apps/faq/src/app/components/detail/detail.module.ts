import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplateModule } from '@rx-angular/template';
import { IconsModule } from '@libertyware/icons'

import { DetailComponent } from './detail.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
    IconsModule
  ],
  exports: [DetailComponent, SummaryComponent],
  declarations: [DetailComponent, SummaryComponent],
  providers: [],
})
export class DetailModule { }

