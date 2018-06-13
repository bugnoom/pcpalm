import { TablepalmProvider } from './../../providers/tablepalm/tablepalm';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  serial : string = "";
  text_error : string = "";
  constantSerial : string = "ARIPPQ01";
  checkpassword : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast : ToastController, private storage : Storage, private db : TablepalmProvider) {
    
  }

  ionViewDidLoad() {
   
    this.db.showloading();
    this.storage.get('password').then(
      data => { 
        if(data == null){
          this.db.hideloading();
          //this.navCtrl.setRoot('LoginPage');
        }else{
          this.navCtrl.setRoot('HomePage');
          this.db.hideloading();
        }
      }, 
      err =>{ this.checkpassword = false; console.log("error pass",err); this.db.hideloading();}
    )
  }

  checkserial(){
    if(this.serial.toUpperCase() == this.constantSerial){
      this.storage.set('password',this.constantSerial)
      this.navCtrl.setRoot('HomePage');
      console.log("Success");
    }else{
      console.log("Error");
      this.text_error = "Invalid serial please try agian!!";
      const t = this.toast.create({
        message : this.text_error,
        duration: 5000,
        position: "bottom"
      });
      t.present();
    }
  }

}
