import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormAddPage } from './form-add';

@NgModule({
  declarations: [
    FormAddPage,
  ],
  imports: [
    IonicPageModule.forChild(FormAddPage),
  ],
})
export class FormAddPageModule {}
