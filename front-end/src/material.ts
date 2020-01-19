import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
