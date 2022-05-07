import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { libertyPlusIcon } from './svg/liberty-plus-icon.icon'

@NgModule({
  imports: [
    CommonModule,
    SvgIconsModule.forRoot({
      sizes: {
        xs: '10px',
        sm: '12px',
        md: '16px',
        lg: '20px'
      },
      icons: [
        libertyPlusIcon
      ]
    })
  ],
  exports: [
    SvgIconsModule
  ]
})
export class IconsModule {}
