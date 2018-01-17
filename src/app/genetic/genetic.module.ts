import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo/demo.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  { path: 'geneticdemo', component: DemoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  declarations: [DemoComponent]
})
export class GeneticModule { }
