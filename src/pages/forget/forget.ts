import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, LoadingController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
  private todo : FormGroup;
  constructor(public toastCtrl:ToastController,public loadingCtrl:LoadingController,public rest:RestProvider,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams,public menu:MenuController,public alertCtrl: AlertController) {
    this.todo = this.formBuilder.group({
      UserName: ['', Validators.required],
  
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }
  logForm(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.rest.forget(this.todo.value).then(data=>{
      loading.dismiss();
      console.log(data)
      let toast = this.toastCtrl.create({
        message: data['Message'],
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    
    })
      this.navCtrl.setRoot(LoginPage)
  }
}
