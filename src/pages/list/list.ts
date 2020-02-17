import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams, AlertController, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ListingPage } from '../listing/listing';
import { ItemPage } from '../item/item';
import { Network } from '@ionic-native/network';
import { MylibPage } from '../mylib/mylib';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  userlog: any
  arr: any = [];
  titlelist: any;
  filterdata: any = [];
  filterItems: any = [];
  newfinter: any = [];
  searchTerm: any;
  treedata: any;
  public Family: any;
  authkey: any;
  constructor(public platform: Platform, public network: Network, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public rest: RestProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.userlog = JSON.parse(localStorage.getItem("user"))
    platform.registerBackButtonAction(() => {
      this.back();
    });
    if (this.network.type == 'none') {
      let alert = this.alertCtrl.create({
        title: 'No internet',
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
    else {
      this.userlog = JSON.parse(localStorage.getItem("user"));
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.arr = { AuthKey: this.userlog.AuthKey }



      this.rest.list(this.arr).then(data => {
        console.log(data)
        this.titlelist = data;
        console.log(this.titlelist.length)
        for (let i = 0; i < this.titlelist.length; i++) {
          console.log(this.titlelist[i].ParentId);
          if (!this.titlelist[i].ParentId) {
            this.filterdata.push({ Title: this.titlelist[i].Title, LibraryId: this.titlelist[i].LibraryId })
          }
        }
        this.newfinter = this.filterdata;
        console.log(this.filterdata)
        loading.dismiss();
      })

    }


  }
  subtitle(item) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      
    });
    loader.present();
    console.log(item)
    let fil = []
    for (let j = 0; j < this.titlelist.length; j++) {

      if (this.titlelist[j].ParentId == item.LibraryId) {

        fil.push({ Title: this.titlelist[j].Title, LibraryId: this.titlelist[j].LibraryId, ParentId: this.titlelist[j].ParentId })
      }
    }

    console.log(fil.length)
    if (fil.length == 0) {
      var data = { "AuthKey": this.userlog.AuthKey, "TopicId": item.LibraryId, "CodeTitle": "", "RowFrom": "0", "RowCount": "20" }
      this.rest.sublist(data).then(data => {
        this.treedata = data;
        loader.dismiss();
        console.log(this.treedata)
        this.navCtrl.push(ItemPage, { id: this.treedata,title:item.Title })
      })


    }
    else {
      loader.dismiss();
      this.navCtrl.push(ListingPage, { id: fil, check: this.titlelist,title:item.Title })
    }

  }
  data(tem) {
    console.log(tem)
  }
  filterItems1() {
    this.newfinter = this.filterdata.filter(item => (item.Title).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  }
  back() {
    this.navCtrl.setRoot(HomePage)
  }
}
