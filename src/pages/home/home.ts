import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TablepalmProvider } from '../../providers/tablepalm/tablepalm';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts={
  THSarabunNew:{
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  }
}

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  searchQuery: string = '';
  items: any = [];
  pdfid : any;
  pdfObj = null;
  listdatas: any = [];
  detaildata : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert : AlertController, private table : TablepalmProvider,private file:File, private fileopener : FileOpener, private plt : Platform) {
    this.getData();
  }

 ionViewDidLoad(){
    this.getData()
 }

 ionViewWillEnter(){
    this.getData();
 }

 doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    console.log('Async operation has ended');
    this.getData();
    refresher.complete();
  }, 1000);
}

  getItems(ev: any) {
    // Reset items back to all of the items
    this.getData();

    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log("val search is ",this.items);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log("item is ",item.rowid.indexOf(val));
        return (item.rowid.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getData() {
    this.table.connectdb().then((db: SQLiteObject) => {
      db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS pcpalm_list(list_id INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT,totalsum NUMBER, createdate DATETIME DEFAULT CURRENT_TIMESTAMP)', {});
        tx.executeSql('CREATE TABLE IF NOT EXISTS pcpalm_detail(rowid INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT, param TEXT,name TEXT, val TEXT,percent TEXT, createdate DATETIME DEFAULT CURRENT_TIMESTAMP)', {})
      })
      db.executeSql("Select * from pcpalm_list  ORDER BY createdate DESC",{})
      .then(res =>{
        this.items = [];
        for(let i=0; i<res.rows.length; i++){
          this.items.push({rowid:res.rows.item(i).id,val:res.rows.item(i).createdate})
        }
        
      })
      .catch(e => console.log("Select Err",e));
      
    }).catch(e => console.log("error SQLite ",e));
  }

  editData(id){
    console.log("Edit id ", id);
  }

  deleteData(id){
   let box = this.alert.create({
     title : 'Confirm to Delete',
     message : 'ยืนยันการลบข้อมูลใบรายเลขที่ ' + id + 'หรือไม่?',
     buttons:[
       {
         text : "ยกเลิก",
         role : 'cancel',
         handler :()=>{
           console.log('cancel del')
           return false;
         }
       },
       {
         text : "ยืนยัน",
         handler: ()=>{
            this.table.deletedata(id);
            this.getData();
         }
       }
     ]
   });
   box.present();
    console.log("Delete id ", id);
  }

  openadd() {
    this.navCtrl.push('FormAddPage')
  }

  openviewer(id){
    //this.navCtrl.push('ReportviewPage',{ids : id});
    this.loaddata(id);
  }

  loaddata(id){
  let listdatas : any;
  let detaildata : any;
    this.table.connectdb().then((db:SQLiteObject)=>{
      db.executeSql('Select * FROM pcpalm_list Where id=?',[id])
        .then(res=>{ 
          console.log(res);
          listdatas = {
            id : res.rows.item(0).id,
            dt : res.rows.item(0).createdate
          };

          //select Detail
          this.table.connectdb().then((db:SQLiteObject)=>{
            db.executeSql('Select * FROM pcpalm_detail Where id=?',[id])
              .then(res=>{ 
                console.log(res);
                detaildata = res
                console.log("detail data",detaildata);
                //calll create pdf
                this.createPdf(id,listdatas,detaildata);
              }).catch(err=>{console.log("select gen :",err); })
        })
          .catch(err=>{console.log("gen Number :",err)})

          console.log('listdata',this.listdatas);
        }).catch(err=>{console.log("select gen :",err); })
  })
    .catch(err=>{console.log("gen Number :",err)})

   
  
    
  }



  createPdf(id,listdata,detaildata){
    console.log("create data list",listdata,detaildata);
    var docDefinition={
      content:[
        {text : 'Header',style: 'header'},
        {text : 'วันเวลา : ' + listdata.dt, alignment:"right"},
        {text : 'เลขที่ : '+id},

        {
          layout : 'lightHorizontalLines',
          table : {
            headerRows : 1,
            widths: ['50','50'],
            body:[
              [ 'รายการ ',' จำนวน % '],
              [ detaildata.rows.item(0).name, detaildata.rows.item(0).percent],
              [ detaildata.rows.item(1).name, detaildata.rows.item(1).percent],
              [ detaildata.rows.item(2).name, detaildata.rows.item(2).percent],
              [ detaildata.rows.item(3).name, detaildata.rows.item(3).percent],
              [ detaildata.rows.item(4).name, detaildata.rows.item(4).percent],
              [ detaildata.rows.item(5).name, detaildata.rows.item(5).percent],
              [ detaildata.rows.item(6).name, detaildata.rows.item(6).percent],
              [ detaildata.rows.item(7).name, detaildata.rows.item(7).percent],
              [ detaildata.rows.item(8).name, detaildata.rows.item(8).percent],
              [ detaildata.rows.item(9).name, detaildata.rows.item(9).percent],

            ]
          }
        },
        {text : " % ทั้งหมด "+listdata.totalsum,style:'header'}
      ],
      defaultStyle:{
        font : 'THSarabunNew'
      },
      styles:{
        header:{
          bold : true,
          fontSize: 20,
          alignment:'center'
        }
      },
      pageSize: 'A4',
      PageOrientation : 'portrait'
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.viewpdf(id);
  }

  viewpdf(id){
    if(this.plt.is('cordova')){
      this.pdfObj.getBuffer((buffer)=>{
        var blob = new Blob([buffer],{type:'application/pdf'});

        this.file.writeFile(this.file.dataDirectory,id+'_.pdf',blob,{replace:true})
        .then(fileEntry =>{
            this.fileopener.open(this.file.dataDirectory+id+'_.pdf','application/pdf');
        })
      })
    }else{
      this.pdfObj.download();
    }
  }


}
