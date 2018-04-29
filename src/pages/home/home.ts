import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TablepalmProvider } from '../../providers/tablepalm/tablepalm';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  searchQuery: string = '';
  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private alert : AlertController, private table : TablepalmProvider) {
    this.getData();
  }

 ionViewDidLoad(){
    this.getData()
 }

 ionViewWillEnter(){
    this.getData();
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
    this.sqlite.create({
      name: 'pcpalm.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS pcpalm_list(list_id INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT, createdate DATETIME DEFAULT CURRENT_TIMESTAMP)', {});
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
          let del = this.table.deletedata(id);
          if(del){
            this.getData();
          }
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



}
