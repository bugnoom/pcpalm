//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/*
  Generated class for the TablepalmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TablepalmProvider {

  loading :any;
  chk : boolean = false;

  constructor( public loadingCtrl : LoadingController, public sqlite : SQLite,public tost : Toast) {
    console.log('Hello TablepalmProvider Provider');
  }

  showloading() {
    this.loading = this.loadingCtrl.create({
      content: "Loading ..."
    })
    this.loading.present();
  }

  hideloading() {
    this.loading.dismiss();
  }

  getpercent(percentvalue){
      let finds;
      let ten;
      let s = percentvalue + "";
      if (s.length < 2) {
  
        console.log(s, "a");
        finds = "0";
        ten = percentvalue;
      } else {
        finds = s[0];
        ten = s[1];
        console.log(finds + "  " + ten);
      }
  
      let tablepalm = [
        {
          "0": [{
            "0": "0",
            "1": '1.20',
            "2": '2.40',
            "3": '3.60',
            "4": '4.80',
            "5": '6.00',
            "6": '7.20',
            "7": '8.40',
            "8": '9.60',
            "9": '10.80',
          }]
        },
        {
          "1": [{
            "0": '0.12',
            "1": '1.32',
            "2": '2.52',
            "3": '3.72',
            "4": '4.92',
            "5": '6.12',
            "6": '7.32',
            "7": '8.52',
            "8": '9.72',
            "9": '10.92',
          }]
        },
        {
          "2": [{
            "0": '0.24',
            "1": '1.44',
            "2": '2.64',
            "3": '3.84',
            "4": '5.04',
            "5": '6.24',
            "6": '7.44',
            "7": '8.64',
            "8": '9.84',
            "9": '10.04',
          }]
        },
        {
          "3": [{
            "0": '0.36',
            "1": '1.56',
            "2": '2.76',
            "3": '3.96',
            "4": '5.16',
            "5": '6.36',
            "6": '7.56',
            "7": '8.76',
            "8": '9.96',
            "9": '11.16',
          }]
        },
        {
          "4": [{
            "0": '0.48',
            "1": '1.68',
            "2": '2.88',
            "3": '4.08',
            "4": '5.28',
            "5": '6.48',
            "6": '7.68',
            "7": '8.88',
            "8": '10.08',
            "9": '11.28',
          }]
        },
        {
          "5": [{
            "0": '0.60',
            "1": '1.80',
            "2": '3.00',
            "3": '4.20',
            "4": '5.40',
            "5": '6.60',
            "6": '7.80',
            "7": '9.00',
            "8": '10.20',
            "9": '11.40',
          }]
        },
        {
          "6": [{
            "0": '0.72',
            "1": '1.92',
            "2": '3.12',
            "3": '4.32',
            "4": '5.52',
            "5": '6.72',
            "6": '7.92',
            "7": '9.12',
            "8": '10.32',
            "9": '11.52',
          }]
        },
        {
          "7": [{
            "0": '0.84',
            "1": '2.04',
            "2": '3.24',
            "3": '4.44',
            "4": '5.64',
            "5": '6.84',
            "6": '8.04',
            "7": '9.24',
            "8": '10.44',
            "9": '11.64',
          }]
        },
        {
          "8": [{
            "0": '0.96',
            "1": '2.16',
            "2": '3.36',
            "3": '4.56',
            "4": '5.76',
            "5": '6.96',
            "6": '8.16',
            "7": '9.36',
            "8": '10.56',
            "9": '11.76',
          }]
        },
        {
          "9": [{
            "0": '1.08',
            "1": '2.28',
            "2": '3.48',
            "3": '4.68',
            "4": '5.88',
            "5": '7.08',
            "6": '8.28',
            "7": '9.48',
            "8": '10.68',
            "9": '11.88',
          }]
        }
      ];
      //  console.log(tablepalm);
      console.log(tablepalm[finds][finds][0][ten]);
      return tablepalm[finds][finds][0][ten]

  }
  
  success(result){
    this.tost.show('Data saved', '5000', 'center').subscribe(
      restost => {
        this.chk = true;
      }
    )
  }

  error(err){
    this.tost.show("Error to save " + err, '5000', 'center').subscribe(
      restost => {
        console.log(restost);
        this.chk= false;
        return true;
      }
    )
  }

  savedatadetail(serial,name,value,percent) {
     let d  = new Date().toISOString;
    this.sqlite.create({
      name: "pcpalm.db",
      location: "default"
    }).then((db: SQLiteObject) => {
      db.transaction(function(tx){
        tx.executeSql('INSERT INTO pcpalm_detail (id,param,val,percent) VALUES (?,?,?,?)',[serial,name,value,percent]);
        tx.executeSql("INSERT INTO pcpalm_list (id) VALUES (?)",[serial]);
      }).then(res =>{
          this.success(res);
      }).catch(err =>{
          this.error(err);
      })
    })
      .catch(e => {
        console.log(e);
        this.tost.show(e, '5000', 'center').subscribe(
          restost => {
            console.log(restost);
          }
        )
      })
  }

}