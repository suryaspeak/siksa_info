import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,ModalController, AlertController, ToastController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MylibPage } from '../pages/mylib/mylib';
import { Network } from '@ionic-native/network';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{title: string, component: any,icon:string}>;

         
          constructor( public menuCtrl: MenuController,private toast: ToastController,private network: Network,modalCtrl: ModalController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
  
    this.initializeApp();
    platform.ready().then(() => {
    
   

      if(localStorage.getItem('user')){
         if(this.network.type=="none"){
          this.menuCtrl.enable(false, 'myMenu');
          this.nav.setRoot(MylibPage);
          
         }
         else{
          this.nav.setRoot(HomePage)
         }
       
      }
      else{
        if(this.network.type=="none"){
        
        }
        else{
          this.nav.setRoot(LoginPage)
        }
       
      }

      statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');

      let splash = modalCtrl.create(SplashPage);
      splash.present();

  });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage,icon:'ios-home' },
      { title: 'Learning Libary', component: ListPage,icon:'ios-book' },
       { title: 'My Book', component: MylibPage,icon:'ios-school' },
 
    ];

  }
  ionViewWillUnload(){
    alert("appclose")
  }
  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
       
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
      this.toast.create({
        message: `No internet`,
        duration: 3000
      }).present();
    }
    else{
      this.toast.create({
        message: `You are now ${connectionState} via ${networkType}`,
        duration: 3000
      }).present();

    
    }

  }
 
  openPage(page) {
    console.log(page)
    this.nav.setRoot(page.component);
  }
  logout(){
    localStorage.removeItem("user");
    this.nav.setRoot(LoginPage)
  }


}
