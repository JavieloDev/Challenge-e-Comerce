import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from "./search/search.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
