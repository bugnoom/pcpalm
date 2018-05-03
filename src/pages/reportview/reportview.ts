import { SQLite ,SQLiteObject} from '@ionic-native/sqlite';
import { TablepalmProvider } from './../../providers/tablepalm/tablepalm';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";


import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';





/**
 * Generated class for the ReportviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reportview',
  templateUrl: 'reportview.html',
})
export class ReportviewPage {
  pdfid : any;
  pdfObj = null;
  listdata : any = [];
  detaildata : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private file:File, private fileopener : FileOpener, private plt : Platform, private table : TablepalmProvider) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    console.log("param :", navParams.get('ids'));
    this.pdfid  = navParams.get('ids');
    this.loaddata();
    //this.createPdf();
   // this.viewpdf();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportviewPage');
    this.loaddata();
   // this.createPdf();
   // this.viewpdf();
  }
  
  ionViewDidEnter(){
   this.loaddata();
  // this.createPdf();
  // this.viewpdf();

  }

  loaddata(){
    this.table.connectdb().then((db:SQLiteObject)=>{
      db.executeSql('Select * FROM pcpalm_list Where id=?',[this.navParams.get('ids')])
        .then(res=>{ 
          console.log(res);
          this.listdata = {
            id : res.rows.item(0).id,
            dt : res.rows.item(0).createdate
          };
          console.log('listdata',this.listdata);
        }).catch(err=>{console.log("select gen :",err); })
  })
    .catch(err=>{console.log("gen Number :",err)})

    this.table.connectdb().then((db:SQLiteObject)=>{
      db.executeSql('Select * FROM pcpalm_detail Where id=?',[this.navParams.get('ids')])
        .then(res=>{ 
          console.log(res);
          this.detaildata = res
          console.log("detail data",this.detaildata);
        }).catch(err=>{console.log("select gen :",err); })
  })
    .catch(err=>{console.log("gen Number :",err)})
  
    this.createPdf();
    
  
  }


  createPdf(){
    console.log(this.listdata);
    var docDefinition={
      content:[
        {text : 'Header',style: 'header'},
        {text : new Date().toTimeString(), alignment:"right"},

        {ul:["a","b","c"]}
      ],
      styles:{
        header:{
          bold : true,
          fontSize: 20
        }
      },
      pageSize: 'A4',
      PageOrientation : 'portrait'
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.viewpdf();
  }

  viewpdf(){
    if(this.plt.is('cordova')){
      this.pdfObj.getBuffer((buffer)=>{
        var blob = new Blob([buffer],{type:'application/pdf'});

        this.file.writeFile(this.file.dataDirectory,this.navParams.get('ids')+'_.pdf',blob,{replace:true})
        .then(fileEntry =>{
            this.fileopener.open(this.file.dataDirectory+this.navParams.get('ids')+'_.pdf','application/pdf');
        })
      })
    }else{
      this.pdfObj.download();
    }
  }

}
