import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';




const Material = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSliderModule,
  MatDialogModule
];

@NgModule({
  imports: [
    Material
  ],
  exports:[
    Material
  ]
})
export class MaterialModule { }
