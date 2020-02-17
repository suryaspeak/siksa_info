import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform, ToastController } from 'ionic-angular';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
// url:any="http://faplp1.centralindia.cloudapp.azure.com:809/RESTService/SiksaRestService.svc/";
url:any="http://www.gainwellsiksa.com/RESTService/SiksaRestService.svc/"
  constructor(public platform:Platform,public http: HttpClient,public network:Network,public toast:ToastController) {
    console.log('Hello RestProvider Provider');
  }

  networkCheck(){
    this.platform.ready().then(() => {
          
               
                 
      this.network.onConnect().subscribe(data => {
        console.log(data)
        this.displayNetworkUpdate(data.type);
      }, error => console.error(error));
     
      this.network.onDisconnect().subscribe(data => {
        console.log(data)
        this.displayNetworkUpdate(data.type);
      }, error => console.error(error));
    });
  }
  displayNetworkUpdate(connectionState: string){
    console.log("hi collencted")
    let networkType = this.network.type;
    if(this.network.type=='none'){
    //   let toast = this.toast.create({
    //     message: "Network Disconnected go offline mode ",
    //     duration: 1235000,
    //     showCloseButton: true,
    //     closeButtonText: "Go Offline"
    // });
   
    //     toast.onDidDismiss(() => {
    //        this.nav.push(MylibPage)

    //         ///undo operation
    //     })
    //    toast.present();
    }
    else{
      this.toast.create({
        message: `You are now ${connectionState} via ${networkType}`,
        duration: 3000
      }).present();

    
    }

  }
  login(data)  
  {
    console.log(data)
    // var formData = new FormData();
    // formData.append('email', data.email);
    // formData.append('password', data.password);
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'userlogin', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  forget(data)  
  {
 
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'forgotpassword', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  list(data){
    console.log(data)
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'learningtopics',JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  sublist(data){
    console.log(data)
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'learningmaterial',JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  test(data){
    console.log(data)
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'learningtest',JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  attac(data){
    console.log(data)
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'learningmaterialdocattachment',JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
