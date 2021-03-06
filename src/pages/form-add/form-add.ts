//import { InputformPage } from './../inputform/inputform';
import { TablepalmProvider } from './../../providers/tablepalm/tablepalm';
import { Toast } from '@ionic-native/toast';
import { Component } from '@angular/core';
import { IonicPage,Platform, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';

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
  pcc: number = 100.00;
  senumber: string = '0';

  sum1: any = 0;
  sum2: any = 0;

  summarygroup1 : any = 0.00 ;
 summarygroup2 : any = 0.00 ;

  percentchoinc = [];

  tweightchoice = [
    { "stext": "น้อยกว่า 5 กก.", "val": "16.5" , selected : false},
    { "stext": "6-7 กก.", "val": "17.5", selected : false },
    { "stext": "8-10 กก.", "val": "18.5" , selected : false},
    { "stext": "11-25 กก.", "val": "20.5", selected : false },
    { "stext": "26 กก. ขึ้นไป", "val": "19.5", selected : false }
  ]

  twaterchoice = [
    { "stext": "40", "val": "40" },
    { "stext": "80", "val": "80" },
  ]

  textcustom = 'ระบุ % Yield';
  err_txt = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private tost: Toast, private tablepalm: TablepalmProvider, public alertCtrl: AlertController, public modal : ModalController) {
    for (let i = 1; i < 100; i++) {
      this.percentchoinc.push(i);
    }
    this.nextid();
    this.calpercent();

  }

  nextid() {
    this.tablepalm.generateAutoNumber();
    let str = "" + this.tablepalm.maxnumber
    let pad = "0000"
    this.senumber = pad.substring(0, pad.length - str.length) + str

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormAddPage');
    this.nextid();
    this.calpercent();
  }

  ionViewDidEnter() {
    this.nextid();
    this.calpercent();
  }

  getpercent(v, gp, obj) { // v = value, gp = Calurate Group, n = name of yield

    switch (obj) {

      case "tblank":
        if (v > 19) { //ตั้งแต่ 20 ขึ้นไป
          let promp = this.alertCtrl.create({
            enableBackdropDismiss : false,
            title: 'ยืนยันข้อมูล',
            message: "เปอร์เซ็นของปาล์มทะลายเปล่า มากกว่า 20% ระบบจะทำการตีกลับทั้งหมด ต้องการยืนยันหรือไม่?",
            buttons: [
              {
                text: 'ยกเลิก',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'ยืนยัน',
                handler: data => {
                  console.log("return tblank")
                  this.pcc = 0;
                  this.addData("ปาล์มทะลายเปล่า มากกว่า 20%")
                }
              }
            ]
          });
          promp.present();

        }
        this.calpercentobject(v, obj, gp)
        break;
      case "tdirty":
        if (v >= 29) { //ตั้งแต่ 30 ขึ้นไป
          let promp = this.alertCtrl.create({
            enableBackdropDismiss : false,
            title: 'ยืนยันข้อมูล',
            message: "เปอร์เซ็นของปาล์มทะลายสกปรก มากกว่า 30% ระบบจะทำการตีกลับทั้งหมด ต้องการยืนยันหรือไม่?",
            buttons: [
              {
                text: 'ยกเลิก',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'ยืนยัน',
                handler: data => {
                  console.log("return tdirty")
                  this.pcc = 0;
                  this.addData("ปาล์มทะลายสกปรก มากกว่า 30%")
                }
              }
            ]
          });
          promp.present();
        }
        this.calpercentobject(v, obj, gp)
        break;
      default:
        this.calpercentobject(v, obj, gp)
        break;
    }
  }

  changeweight() {
    if (this.field_data[0].tweight == -1) {
      let prompt = this.modal.create('InputformPage');

      prompt.onDidDismiss(data=>{
        console.log("return is : ",data);
        console.log('Saved clicked',data);
        if(data == 0 || data == ""){
          let zero = 0;
             this.field_data[0].tweight = 0;
             // this.tweightchoice.push({"stext": zero +" %", "val": zero, selected : true });
        }else{
          this.field_data[0].tweight = data;
          this.tweightchoice.push({"stext": data +" %", "val": data, selected : true });
        }
              
              this.calpercent();
      })

      prompt.present();


     /*  let prompt = this.alertCtrl.create({
        enableBackdropDismiss : false,
        title: 'กำหนด % Yield',
        message: "ระบุ % Yield โดยตรงตามต้องการ",
        inputs: [
          {
            name: '% Yield',
            placeholder: '% Yield',
            type : 'number'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              console.log('Saved clicked',data['% Yield']);
              this.field_data[0].tweight = data['% Yield'];
              this.tweightchoice.push({"stext": data['% Yield']+" %", "val": data['% Yield'], selected : true })
              this.calpercent();
            }
          }
        ]
      });
      prompt.present(); */
    }else{
      this.calpercent();
    }
   
  }

  calpercentobject(value, object, group) {
    value = this.tablepalm.getpercent(value, object);
    let resut = parseFloat(value);
    this.calpercent();
  }

 

  calpercent() {
    //console.log(this.field_data[0].tweight, 'Weight');
    let w = this.field_data[0].tweight;
    this.sum1 = this.tablepalm.getpercent(this.field_data[0].traw, 'traw')+ this.tablepalm.getpercent(this.field_data[0].tripe, 'tripe') + this.tablepalm.getpercent(this.field_data[0].tblank, 'tblank') +this.tablepalm.getpercent(this.field_data[0].tincomplete, 'tincomplete');

    console.log("sum1 is :",this.sum1);

    this.sum2 = this.tablepalm.getpercent(this.field_data[0].tlong, 'tlong') +this.tablepalm.getpercent(this.field_data[0].told, 'told')+ this.tablepalm.getpercent(this.field_data[0].tdirty, 'tdirty')+ this.tablepalm.getpercent(this.field_data[0].tdula, 'tdula')+ this.tablepalm.getpercent(this.field_data[0].twater, 'twater');

    console.log("sum2 is :",this.sum2);
    let summery = (w - parseFloat(this.sum1)) - parseFloat(this.sum2);

    this.pcc = parseFloat(summery.toFixed(2));
  }

  addData(txt) {
    this.tablepalm.savedatelist(this.senumber, this.pcc,txt);
    console.log(this.field_data);
    for (let x of this.field_data) {
      this.tablepalm.savedatadetail(this.senumber, 'tweight', 'น้ำหนัก',  this.tablepalm.getpercent(x.tweight, ''), x.tweight)
      this.tablepalm.savedatadetail(this.senumber, 'traw', 'ทะลายดิบ',    this.tablepalm.getpercent(x.traw, 'traw'), x.traw)
      this.tablepalm.savedatadetail(this.senumber, 'tripe', 'ทะลายกึ่งสุก', this.tablepalm.getpercent(x.tripe, 'tripe'), x.tripe)
      this.tablepalm.savedatadetail(this.senumber, 'tblank', 'ทะลายเปล่า', this.tablepalm.getpercent(x.tblank, 'tblank'), x.tblank)
      this.tablepalm.savedatadetail(this.senumber, 'tincomplete', 'ทะลายไม่สมบูรณ์', this.tablepalm.getpercent(x.tincomplete, 'tincomplete'), x.tincomplete)
      this.tablepalm.savedatadetail(this.senumber, 'tlong', 'ทะลายก้านยาว', this.tablepalm.getpercent(x.tlong, 'tlong'), x.tlong)
      this.tablepalm.savedatadetail(this.senumber, 'told', 'ทะลายเก่า', this.tablepalm.getpercent(x.told, 'told'), x.told)
      this.tablepalm.savedatadetail(this.senumber, 'tdirty', 'ทะลายสกปรก', this.tablepalm.getpercent(x.tdirty, 'tdirty'), x.tdirty)
      this.tablepalm.savedatadetail(this.senumber, 'tdula', 'ทะลายพันธ์ดูร่าปาล์ม', this.tablepalm.getpercent(x.tdula, 'tdula'), x.tdula)
      this.tablepalm.savedatadetail(this.senumber, 'twater', 'ทะลายมีลักษณะสดและมีรอยรถน้ำ', this.tablepalm.getpercent(x.twater, 'twater'), x.twater)
    }

    if(this.tablepalm.chk == true){
      this.navCtrl.setRoot('HomePage');
    }else{
      console.log("err")
      this.navCtrl.setRoot('HomePage');
    }

  }

  autonumber() {

  }


}

