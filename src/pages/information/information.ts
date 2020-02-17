import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController,AlertController, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ListingPage } from '../listing/listing';
import { ItemPage } from '../item/item';

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {
  page:any;
  getlibaryid:any=[];
  getlibaryid3:any=[];
  arr:any=[];
  titlelist:any;
  subid:any;
  treedata:any;
  all:any;
  userlog:any;
  header:any;
  constructor(public platform:Platform,public toastCtrl:ToastController,public loadingCtrl:LoadingController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.userlog=JSON.parse(localStorage.getItem("user"));
    this.getlibaryid=this.navParams.get('id');
    this.all=this.navParams.get('check');
    this.header=this.navParams.get('title')
    platform.registerBackButtonAction(() => {
      this.back();
    });
  //   this.arr={ "AuthKey":"77B5ADCD-E662-4B8B-A4D9-BC11CA79D76B", "TopicId":this.getlibaryid, "CodeTitle":"", "RowFrom":"0", "RowCount":"10" }
      
   
  //  console.log(this.getlibaryid);
  //  this.rest.sublist(this.arr).then(data=>{
  //   this.titlelist=data
  //  console.log(data)

  //  })

  
 
 
 
 
  }
  ionViewDidLeave() {
    console.log("hi")
    // this.getlibaryid=[];
  }

  ionViewDidLoad() {
    this.page="InformationPage"
    // console.log('ionViewDidLoad InformationPage');
  }
  subtitle(item){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      
    });
    loader.present();
    // console.log(item)
    for(let f=0;f<this.getlibaryid.length;f++){
      if(item.LibraryId==this.getlibaryid[f].ParentId){
   
       this.getlibaryid3.push({Title:this.getlibaryid[f].Title,LibraryId:this.getlibaryid[f].LibraryId,ParentId:this.getlibaryid[f].ParentId})
  
      
    }
  
}
     
         if(this.getlibaryid3.length==0){
        //   var data= { "AuthKey":"77B5ADCD-E662-4B8B-A4D9-BC11CA79D76B", "TopicId":item.LibraryId, "CodeTitle":"", "RowFrom":"0", "RowCount":"10" } 
        //   this.rest.sublist(data).then(data=>{
        //    this.treedata=data;
        
        //  console.log(this.treedata)
        //  })
       
           var data= { "AuthKey":this.userlog.AuthKey, "TopicId":item.LibraryId, "CodeTitle":"", "RowFrom":"0", "RowCount":"10" } 
           this.rest.sublist(data).then(data=>{
            this.treedata=data;
            loader.dismiss();
          console.log(this.treedata.length)
          this.navCtrl.push(ItemPage,{id:this.treedata,title:item.Title})
          })
          
        
         }
         else{
          loader.dismiss();
         }
    // this.navCtrl.push(ListingPage,{id:this.getlibaryid})  
  //   var data= { "AuthKey":"77B5ADCD-E662-4B8B-A4D9-BC11CA79D76B", "TopicId":item.LibraryId, "CodeTitle":"", "RowFrom":"0", "RowCount":"10" } 
  //      this.rest.sublist(data).then(data=>{
  //       this.treedata=data;
  //     console.log(this.treedata.length)
  //       if(this.treedata.length==0){
  //         alert("NO data found")
  //       }
  //       else{
  //         if(this.page=='InformationPage'){
  //           this.navCtrl.push(ListingPage,{id:this.treedata})
  //         }
  //         else{
  //           this.navCtrl.push(InformationPage,{id:this.treedata})  
  //         }
          
  //       }
       
  //     })
     
   
   }
   back(){
    this.navCtrl.pop()
   }
}
