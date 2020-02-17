import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController,AlertController, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { InformationPage } from '../information/information';
import { ItemPage } from '../item/item';
import { MylibPage } from '../mylib/mylib';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the ListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})
export class ListingPage {
  page:any;
  getlibaryid:any=[];
  getlibaryid2:any=[];
  arr:any=[];
  titlelist:any;
  subid:any;
  treedata:any;
  all:any;
  searchTerm:any;
  filterdata:any=[];
  userlog:any;
  headername:any;
  constructor(public platform:Platform,public network:Network,public toastCtrl:ToastController,public loadingCtrl:LoadingController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.headername=this.navParams.get('title')
    this.userlog = JSON.parse(localStorage.getItem("user"));
    console.log(this.userlog.AuthKey)
    platform.registerBackButtonAction(() => {
      this.back();
    });
    if(this.network.type=='none'){
      let alert = this.alertCtrl.create({
        title: 'Confirm purchase',
        message: 'Do you want to buy this book?',
        buttons: [
         
          {
            text: 'Go offline',
            handler: () => {
              this.navCtrl.setRoot(MylibPage)
            }
          }
        ]
      });
      alert.present();

     }
     else{
      this.getlibaryid=this.navParams.get('id');
      this.filterdata=this.getlibaryid;
       this.all=this.navParams.get('check');
  
  
       this.arr={ "AuthKey":this.userlog.AuthKey, "TopicId":this.getlibaryid, "CodeTitle":"", "RowFrom":"0", "RowCount":"10" }
  
      this.rest.sublist(this.arr).then(data=>{
       this.titlelist=data;
   
  
      })
     }
   

}
sub(item){
  const loader = this.loadingCtrl.create({
    content: "Please wait...",
    
  });
  loader.present();

  for(let f=0;f<this.all.length;f++){
    if(item.LibraryId==this.all[f].ParentId){

     this.getlibaryid2.push({Title:this.all[f].Title,LibraryId:this.all[f].LibraryId,ParentId:this.all[f].ParentId})
  }

  }

  console.log(this.getlibaryid2)
  if(this.getlibaryid2.length==0){
    var data= { "AuthKey":this.userlog.AuthKey, "TopicId":item.LibraryId, "CodeTitle":"", "RowFrom":"0", "RowCount":"10" } 
    this.rest.sublist(data).then(data=>{
     this.treedata=data;
  
   console.log(this.treedata);
   loader.dismiss();
   this.navCtrl.push(ItemPage,{id:this.treedata,title:item.Title})
   })

  }
  else{
    loader.dismiss();
    this.navCtrl.push(InformationPage,{id:this.getlibaryid2,title:item.Title})  
  }

 
}
ionViewWillEnter(){
  console.log("hi")
  this.getlibaryid2=[];
}

ionViewDidLoad() {
  this.page="ListingPage"

}
filterItems1(){
  this.filterdata = this.getlibaryid.filter(item =>  (item.Title ).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
 }
 back(){
  this.navCtrl.pop()
 }
}
