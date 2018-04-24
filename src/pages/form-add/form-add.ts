import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-form-add',
  templateUrl: 'form-add.html',
})
export class FormAddPage {

  tweight: any;
  traw: any;
  tripe: any;
  tblank: any;
  tincomplete: any;
  tlong: any;
  told: any;
  tdirty: any;
  tdula: any;
  twater: any;
  pcc: number = 100;
  senumber: string = '0';

  sum1 : number = 0;
  sum2 : number = 0;

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 1; i < 100; i++) {
      this.percentchoinc.push(i);
    }
    this.calpercent();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormAddPage');
  }

  getpercent(v,obj) {
    let finds ;
    let ten ;
    let s = v+"";
    if(s.length < 2){
          
  console.log(s,"a");
       finds = "0";
       ten = v;
    }else{
      finds = s[0];
      ten = s[1];
      console.log(finds+"  "+ten);
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
    v = tablepalm[finds][finds][0][ten];
    let resut = parseInt(v);
    if(obj == '1'){
      this.sumgroup1(resut);
    }else{
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
    console.log(this.tweight, 'Weight');
    let summery = this.tweight - (this.sum1 - this.sum2);

    this.pcc = summery;
  }

}
