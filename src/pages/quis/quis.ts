import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ResultPage } from '../result/result';
/**
 * Generated class for the QuisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-quis',
  templateUrl: 'quis.html',
})
export class QuisPage {
  @ViewChild('slides') slides: Slides;
  idget:any;
  test:any;
  submit:any;
  indexslide:any;
  checkedIdx=0;
  answer:any;
  currentans:any;
  ansarrshow:any;
  ansarr:any=[];
  userlog:any;
  constructor(public platform:Platform,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
   this.idget=this.navParams.get('id');
   this.userlog=JSON.parse(localStorage.getItem("user"));
   var data={ "AuthKey":this.userlog.AuthKey, "LibraryId":this.idget }
   this.rest.test(data).then(data=>{
     this.test=data; 
     this.slides.lockSwipes(true)
     this.indexslide=this.slides.getActiveIndex()
     platform.registerBackButtonAction(() => {
      this.back();
    });
     if(this.test.length==0){
       this.navCtrl.pop();

     }
     
   })
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuisPage');
  } 
  slideChanged(index){
    this.indexslide=this.slides.getActiveIndex();
 
    this.submit=this.test.length;

  }
  ans(ite,item){
    this.currentans=item;
    this.ansarrshow=ite;
    console.log(ite,item)
  }
  answershow(ite){
    console.log(ite)
  }
  next() {
    this.ansarr;
    this.ansarr.push({ans:this.currentans,ansall:this.ansarrshow})
    this.slides.lockSwipeToNext(true)
    console.log(this.indexslide+1)
    console.log(this.test.length)
    if(this.test.length==this.indexslide){
      console.log("wwork")
      this.slides.lockSwipeToNext(true)
    }
    else{
      this.slides.lockSwipes(false)
    }
     console.log(this.ansarr)
    this.slides.slideNext();
  }
  submitg(){
    var nu:number=0;
    console.log(this.idget)
     this.ansarr.push({ans:this.currentans,ansall:this.ansarrshow})
     for(let a=0;a<this.ansarr.length;a++){
        if(this.ansarr[a].ans=='y'){
          nu++

        }
     }
     this.navCtrl.setRoot(ResultPage,{totalq:this.ansarr.length,totalm:nu,id:this.idget,answernew:this.ansarr})
  }
  prev() {
    this.slides.slidePrev();
  }
  back(){
    this.navCtrl.pop()
   }
}
