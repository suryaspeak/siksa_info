import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { QuisPage } from '../quis/quis';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer'; 
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file'; 
import { RestProvider } from '../../providers/rest/rest';
import { MylibPage } from '../mylib/mylib';
import { Network } from '@ionic-native/network';
import { HomePage } from '../home/home';
/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  getlibaryid:any;
  userlog:any
  arr:any=[];
  titlelist:any;
  filterdata:any=[];
  filterItems:any=[];
  searchTerm:any;
  headername:any;
  private fileTransfer: FileTransferObject; 
  url:any;
  d:any;
  code:any;
  epuburl:any;
  dirurl:any;
  dateget:any;
  epubarr:any=[];
  title:any;
  titleforlocal:any;
  arrnew:any=[];
  ofline:any=[];
  localstdata:any=[];
 
  constructor(public platform:Platform,public network:Network,public alert:AlertController,private fileOpener: FileOpener,private transfer: FileTransfer, private file: File,public toastCtrl:ToastController,public loadingCtrl:LoadingController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.headername=this.navParams.get('title')
    platform.registerBackButtonAction(() => {
      this.back();
    });
    this.userlog=JSON.parse(localStorage.getItem("user"));
    if(this.network.type=='none'){
      let alert = this.alertCtrl.create({
        title: 'No Internet',
        message: 'Do you want to go offline?',
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
      if(this.filterdata.length==0){
        let toast = this.toastCtrl.create({
          message: 'No item found',
          duration: 3000
        });
        toast.present();
        this.navCtrl.pop();
  
      }else{

  
      }
      
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }
  test(item){
    if(this.network.type=='none'){
      let alert = this.alertCtrl.create({
        title: 'No Internet',
        message: 'Go Online for Test',
        buttons: [
         
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.setRoot(HomePage)
            }
          }
        ]
      });
      alert.present();

     }else{
      this.navCtrl.push(QuisPage,{id:item.LibraryId})
     }

  }

  ok(item,code,title){
    this.titleforlocal=title;
    this.code=code;
    var data={ "AuthKey":this.userlog.AuthKey, "LibraryId":item };
    this.rest.attac(data).then(data=>{
      if(data){
        console.log(data)
        this.d=data;
       this.url = encodeURI(this.d);   
       this.download();
      }
     
    })
  }

  public download() {
   
    if(localStorage.getItem('url')){

      this.localstdata=JSON.parse(localStorage.getItem('url'));

      let i = this.localstdata.findIndex(item=>{
        return item.title==this.titleforlocal}
        
      );

      if(i!=-1){

        this.fileOpener.appIsInstalled('com.faultexception.reader').then(data => {
  
          if(data.status==1){
            this.fileOpener.open(this.localstdata[i].url, 'application/epub+zip')
            
          }
          else {
            window.open("https://play.google.com/store/apps/details?id=com.faultexception.reader&hl=en", '_system')
          }

        })
      }
      else{

        let loading = this.loadingCtrl.create({
          content: 'Downloading Please wait...'
        });
        loading.present();
        
         this.fileTransfer = this.transfer.create(); 
         var currentDate: string = new Date().toLocaleDateString();
         this.dateget=currentDate;
         let dd=this.dateget.split('/');
         let firstName = dd[0];
         let sen = dd[1];
         let last=dd[2]
         let filan=dd[0]+dd[1]+dd[2]
         console.log(filan)

           // localdatasave
        if (localStorage.getItem("FileName")) {
          console.log("folder exists")
        }
        else {
          localStorage.setItem("FileName", JSON.stringify(filan))
        }
         this.file.createDir(this.file.externalApplicationStorageDirectory, filan,true).then(data=>{
          console.log(JSON.stringify(data.nativeURL))
            this.dirurl=data.nativeURL;
        
       
            this.fileTransfer.download(this.url, this.dirurl+ this.code+".epubv", true).then((entry) => { 
              console.log('download completed: ' + entry.toURL());  

              this.epuburl=entry.toURL();
              // this.ofline=[{title:this.titleforlocal,url:this.epuburl,date:new Date().toLocaleDateString()}]
               this.arrnew.push({"url":this.epuburl,"title":this.titleforlocal,"date":new Date().toLocaleDateString()})
              //  console.log(JSON.stringify(this.arrnew))
               localStorage.setItem("url",JSON.stringify(this.arrnew))
              
              loading.dismiss();


          //file opener

          this.fileOpener.appIsInstalled('com.faultexception.reader').then(data => {
                console.log(JSON.stringify(entry.toURL()));
                if(data.status==1){
                  this.fileOpener.open(entry.toURL(), 'application/epub+zip')
                  
                }
                else {
                  window.open("https://play.google.com/store/apps/details?id=com.faultexception.reader&hl=en", '_system')

                }
      
              })
             
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error opening file', JSON.stringify(e)));
            
          
               }, (error) => { 
                console.log('download failed: ' + error);       
          
                  }); 

       
          })



      }

  

    } 
    else
    {
   
      let loading = this.loadingCtrl.create({
        content: 'Downloading Please wait...'
      });
      loading.present();
      
       this.fileTransfer = this.transfer.create(); 
       var currentDate: string = new Date().toLocaleDateString();
       this.dateget=currentDate;
       let dd=this.dateget.split('/');
       let firstName = dd[0];
       let sen = dd[1];
       let last=dd[2]
       let filan=dd[0]+dd[1]+dd[2]
       console.log(filan)

       if (localStorage.getItem("FileName")) {
        console.log("327 folder exists")
      }
      else {
        localStorage.setItem("FileName", JSON.stringify(filan))
      }
       this.file.createDir(this.file.externalApplicationStorageDirectory, filan,true).then(data=>{
        console.log(JSON.stringify(data.nativeURL))
          this.dirurl=data.nativeURL;
      
     
          this.fileTransfer.download(this.url, this.dirurl+ this.code+".epubv", true).then((entry) => { 
            console.log('download completed: ' + entry.toURL());  

            this.epuburl=entry.toURL();
            // this.ofline=[{title:this.titleforlocal,url:this.epuburl,date:new Date().toLocaleDateString()}]
             this.arrnew.push({"url":this.epuburl,"title":this.titleforlocal,"code":this.code,"date":new Date().toLocaleDateString()})
            //  console.log(JSON.stringify(this.arrnew))
             localStorage.setItem("url",JSON.stringify(this.arrnew))
            
            loading.dismiss();


        //file opener

        this.fileOpener.appIsInstalled('com.faultexception.reader').then(data => {
              console.log(JSON.stringify(entry.toURL()));
              if(data.status==1){
                this.fileOpener.open(entry.toURL(), 'application/epub+zip')
                
              }
              else {
                window.open("https://play.google.com/store/apps/details?id=com.faultexception.reader&hl=en", '_system')

              }
    
            })
           
              .then(() => console.log('File is opened'))
              .catch(e => console.log('Error opening file', JSON.stringify(e)));
          
        
             }, (error) => { 
              console.log('download failed: ' + error);       
        
                }); 

     
        })
     }
    
     }  


     filterItems1(){
      this.filterdata = this.getlibaryid.filter(item =>  (item.Title+item.Code).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
     }
     back(){
      this.navCtrl.pop()
     }
}
