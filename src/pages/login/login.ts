import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from './../../providers/rest/rest';
import { ForgetPage } from '../forget/forget';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private todo : FormGroup;
  public userlog:any;
  passwordType: string = 'password';
 passwordIcon: string = 'eye-off';
  constructor(public toastCtrl:ToastController,public loadingCtrl:LoadingController,public rest:RestProvider,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams,public menu:MenuController,public alertCtrl: AlertController) {
  this.menu.swipeEnable(false);

  this.todo = this.formBuilder.group({
    EmployeeId: ['', Validators.required],
    Password: ['', Validators.required],
  }); 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  openDashboardPage() {
    this.navCtrl.setRoot(HomePage);

  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}
  logForm(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
     console.log(this.todo.value)
    this.rest.login(this.todo.value).then(data=>{
       this.userlog=data;
      if(data['Status']=="failed"){
         loading.dismiss();
         let toast = this.toastCtrl.create({
          message: data['Message'],
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      else{
        localStorage.setItem("user",JSON.stringify(this.userlog))
        loading.dismiss();
        this.navCtrl.setRoot(HomePage)
      }
      console.log(data)
    })
    loading.dismiss();

  }
  reset(){
    this.navCtrl.push(ForgetPage);
  }
}
