import { TablepalmProvider } from './../../providers/tablepalm/tablepalm';
import { Toast } from '@ionic-native/toast';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



@IonicPage()
@Component({
  selector: 'page-form-add',
  templateUrl: 'form-add.html',
})
export class FormAddPage {

  field_data = [{
    tweight: 0,
    traw: 0,
    tripe: 0,
    tblank: 0,
    tincomplete: 0,
    tlong: 0,
    told: 0,
    tdirty: 0,
    tdula: 0,
    twater: 0,
  }]
  pcc: number = 100;
  senumber: string = '0';

  sum1: number = 0;
  sum2: number = 0;

  percentchoinc = [];

  tweightchoice = [
    { "stext": "น้อยกว่า 5 กก.", "val": "16.5" },
    { "stext": "6-7 กก.", "val": "17.5" },
    { "stext": "8-10 กก.", "val": "18.5" },
    { "stext": "11-25 กก.", "val": "20.5" },
    { "stext": "26 กก. ขึ้นไป", "val": "19.5" }
  ]

  twaterchoice = [
    { "stext": "40", "val": "40" },
    { "stext": "80", "val": "80" },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private tost: Toast, private tablepalm: TablepalmProvider) {
    for (let i = 1; i < 100; i++) {
      this.percentchoinc.push(i);
    }
    this.tablepalm.generateAutoNumber();
    let str = "" + this.tablepalm.maxnumber
    let pad = "0000"
    this.senumber  = pad.substring(0, pad.length - str.length) + str
    this.calpercent();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormAddPage');
  }

  getpercent(v, obj) {
    v = this.tablepalm.getpercent(v);
    let resut = parseFloat(v);
    if (obj == '1') {
      this.sumgroup1(resut);
    } else {
      this.sumgroup2(resut);
    }
    this.calpercent();
  }

  sumgroup1(v) {
    this.sum1 += v
  }

  sumgroup2(t) {
    this.sum2 += t
  }

  calpercent() {
    console.log(this.field_data[0].tweight, 'Weight');
    let w = this.field_data[0].tweight
    let summery = w - (this.sum1 - this.sum2);

    this.pcc = summery;
  }

  addData() {
    
    console.log(this.field_data);
    for (let x of this.field_data) {
      this.tablepalm.savedatadetail(this.senumber,'tweight',this.tablepalm.getpercent(x.tweight),x.tweight)
      this.tablepalm.savedatadetail(this.senumber,'traw',this.tablepalm.getpercent(x.traw),x.traw)
      this.tablepalm.savedatadetail(this.senumber,'tripe',this.tablepalm.getpercent(x.tripe),x.tripe)
      this.tablepalm.savedatadetail(this.senumber,'tblank',this.tablepalm.getpercent(x.tblank),x.tblank)
      this.tablepalm.savedatadetail(this.senumber,'tincomplete',this.tablepalm.getpercent(x.tincomplete),x.tincomplete)
      this.tablepalm.savedatadetail(this.senumber,'tlong',this.tablepalm.getpercent(x.tlong),x.tlong)
      this.tablepalm.savedatadetail(this.senumber,'told',this.tablepalm.getpercent(x.told),x.told)
      this.tablepalm.savedatadetail(this.senumber,'tdirty',this.tablepalm.getpercent(x.tdirty),x.tdirty)
      this.tablepalm.savedatadetail(this.senumber,'tdula',this.tablepalm.getpercent(x.tdula),x.tdula)
      this.tablepalm.savedatadetail(this.senumber,'twater',this.tablepalm.getpercent(x.twater),x.twater)
    }
    if(this.tablepalm.chk == true){
      this.navCtrl.goToRoot;
    }
  }

  autonumber(){

  }

  
}
