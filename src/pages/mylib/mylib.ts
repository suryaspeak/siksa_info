import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL, ToastController, AlertController, Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { HomePage } from '../home/home';
import { Network } from '@ionic-native/network';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from
  '@angular/platform-browser';
import * as moment from 'moment'
/**
 * Generated class for the MylibPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-mylib',
  templateUrl: 'mylib.html',
})
export class MylibPage {
  get: any;
  geta: any;
  filterarr: any = [];
  searchTerm: any;
  arrcopy: any = [];
  userlog: any
  arr: any = [];
  titlelist: any;
  filterdata: any = [];
  filterItems: any = [];

  private fileTransfer: FileTransferObject;
  url: any;
  d: any;
  code: any;
  epuburl: any;
  dirurl: any;
  dateget: any;
  epubarr: any = [];
  title: any;
  titleforlocal: any;
  arrnew: any = [];
  ofline: any = [];
  localstdata: any = [];
  imageurl: any;
  datenewget: any;
  comparedate: any;
  dayone: any;
  daytwo: any;
  deletestring: any;
  constructor(public platform: Platform, public alertCtrl: AlertController, public network: Network, public toast: ToastController, private fileOpener: FileOpener, private transfer: FileTransfer, private file: File, public navCtrl: NavController, public navParams: NavParams) {

    this.get = (JSON.parse(localStorage.getItem('url')));
    this.userlog = JSON.parse(localStorage.getItem("user"));
    var currentDate: string = new Date().toLocaleDateString();
    this.dateget = currentDate;
    let dd = this.dateget.split('/');
    let firstName = dd[0];
    let sen = dd[1];
    let last = dd[2]
    let filan = dd[0] + "-" + dd[1] + "-" + dd[2]
    this.platform.ready().then(() => {

      if (localStorage.getItem('FileName')) {
        let getarr = localStorage.getItem('FileName')
        this.datenewget = getarr;
        let ss = this.datenewget;
        let datefromdatabase = dd[2] + "-" + dd[1] + "-" + dd[0];
        this.comparedate = datefromdatabase;
        var d = new Date();
        var joinDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        let date1 = moment(this.comparedate, "YYYY-MM-DD");
        let date2 = moment(joinDate, "YYYY-MM-DD");
        let duration = moment.duration(date2.diff(date1));
        let days = duration.asDays();
        if (days == 15) {
          this.deletestring = ss.replace(/['"]+/g, '');
          console.log("d" + this.deletestring)
          // console.log("hi"+Number(this.deletestring))
          this.file.removeRecursively(this.file.externalApplicationStorageDirectory, this.deletestring).then(data => {


          }).then(() => {
            localStorage.removeItem('FileName')
            localStorage.removeItem('url')
          })

        }
        else {

        }
      }
      else {
        console.log("No file Found")

      }
    }).then(() => {

      if (this.get) {
        this.filterarr = this.get;
        if (this.filterarr.length > 0) {
          for (let l = 0; l < this.filterarr.length; l++) {
            this.arrcopy.push({
              "imgurl": this.filterarr[l].imgurl, "code": this.filterarr[l].code, title: this.filterarr[l].title, "url": this.filterarr[l].url
            })
          }
        }
        else {
          alert("No data found")
        }
      }
      else {
        console.log("subhatest" + this.filterarr.length)

      }


      platform.registerBackButtonAction(() => {
        this.back();
      });
      if (this.get) {

        this.geta = this.get;
      } else {
        if (this.network.type == 'none') {

        }
        else {
          let alert = this.alertCtrl.create({
            title: 'No Offline Data Found ',
            message: 'Pleash save data before Offline',
            buttons: [

              {
                text: 'Go Online',
                handler: () => {
                  this.navCtrl.setRoot(HomePage)
                }
              }
            ]
          });
          alert.present();
        }
      }

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MylibPage');
  }
  ok(item) {
    this.fileOpener.appIsInstalled('com.faultexception.reader').then(data => {

      if (data.status == 1) {
        this.fileOpener.open(item.url, 'application/epub+zip')

      }
      else {
        window.open("https://play.google.com/store/apps/details?id=com.faultexception.reader&hl=en", '_system')

      }

    })
    console.log(JSON.stringify(item))
  }
  filterItems1() {
    this.filterarr = this.get.filter(item => (item.Title + item.Code).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  }

  back() {
    this.navCtrl.setRoot(HomePage)
  }
}
