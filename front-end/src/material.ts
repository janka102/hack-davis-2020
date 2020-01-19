import { NgModule } from '@angular/core';
import { MatIconModule, MatToolbarModule } from '@angular/material';

const modules = [
  MatIconModule,
  MatToolbarModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
