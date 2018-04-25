import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  searchQuery: string = '';
  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
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

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getData() {
    this.sqlite.create({
      name: 'pcpalm.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS pcpalm_list(list_id INTERGER PRIMARY KEY, id TEXT, createdate DATETIME DEFAULT CURRENT_TIMESTAMP)', {});
        tx.executeSql('CREATE TABLE IF NOT EXISTS pcpalm_detail(rowid INTERGER PRIMARY KEY, id TEXT, param TEXT, val TEXT,percent TEXT, createdate DATETIME DEFAULT CURRENT_TIMESTAMP)', {})
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
    console.log("Delete id ", id);
  }

  openadd() {
    this.navCtrl.push('FormAddPage')
  }



}
