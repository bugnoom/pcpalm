import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the InputformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inputform',
  templateUrl: 'inputform.html',
})
export class InputformPage {

  yield : number = 0;
  isIos : Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public plaform : Platform) {
    if(this.plaform.is('ios')){
      this.isIos = true;
    }else{
      this.isIos = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputformPage');
  }

  public closeModal(){
    this.viewCtrl.dismiss(this.yield);
}

}
