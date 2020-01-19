import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';

const modules = [
  MatCardModule,
  MatIconModule,
  MatToolbarModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
