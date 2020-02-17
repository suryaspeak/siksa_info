import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';

 
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  totalqget:any;
  totalm:any;
  resultdata:any=[];
  idget:any;
  answernewget:any;
  userlog:any;
  constructor(public platform:Platform,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.userlog = JSON.parse(localStorage.getItem("user"));
    this.totalqget=this.navParams.get('totalq');
    this.totalm=this.navParams.get('totalm');
    this.idget=this.navParams.get('id');
    this.answernewget=this.navParams.get('answernew')
    platform.registerBackButtonAction(() => {
      this.back();
    });
 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }
  ok(){
    this.navCtrl.setRoot(HomePage)
  }
  okdets(){
    var data={ "AuthKey":this.userlog.AuthKey, "LibraryId":this.idget }
    this.rest.test(data).then(data=>{
      this.resultdata=data; 
    }).then(()=>{
      console.log(this.answernewget)
      console.log(this.resultdata);
      for(let i=0;i<this.resultdata.length;i++){
        this.resultdata[i].ansorg=this.answernewget[i].ansall;
      }
      console.log(this.resultdata)
    })

  }
  back(){
    this.navCtrl.setRoot(HomePage)
   }
}
