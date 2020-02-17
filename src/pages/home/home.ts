import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams, AlertController, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { QuisPage } from '../quis/quis';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { MylibPage } from '../mylib/mylib';
import { Network } from '@ionic-native/network';
import * as moment from 'moment'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userlog: any
  arr: any = [];
  titlelist: any;
  filterdata: any = [];
  filterItems: any = [];
  searchTerm: any;
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
  public pagingEnabled: boolean = true;
  deletestring: any;
  currentCount: any = 0;
  endPage: any = 10;
  newposts1: any;
  newposts: any;
  constructor(public toast: ToastController, public network: Network, public platform: Platform, public alert: AlertController, private fileOpener: FileOpener, private transfer: FileTransfer, private file: File, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public rest: RestProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
 
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
          console.log(this.file.externalApplicationStorageDirectory)

          this.file.removeRecursively(this.file.externalApplicationStorageDirectory, this.deletestring).then(data => {
            localStorage.removeItem('FileName')
            localStorage.removeItem('url')
          })

        }
        else {
          console.log(ss)
          
        }
      }
      else {
        console.log("NO file Found")

      }
    })


    platform.registerBackButtonAction(() => {
      this.back();
    });
    if (this.network.type == 'none') {
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
    else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      //  localStorage.removeItem('url')
      this.arr = { "AuthKey": this.userlog.AuthKey, "TopicId": "", "CodeTitle": "", "RowFrom": this.currentCount, "RowCount": this.endPage }

      this.rest.sublist(this.arr).then(data => {

        this.titlelist = data;
        if (this.titlelist.length == 0) {
          let toast = this.toastCtrl.create({
            message: 'No Data Found',
            duration: 3000
          });
          toast.present();
          loading.dismiss();
        } else {
          this.filterItems = this.titlelist;
          loading.dismiss();
        }


      }).catch(err => {
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
      })

    }

  }

  test(item) {

    if (this.network.type == 'none') {
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

    } else {
      this.navCtrl.push(QuisPage, { id: item.LibraryId })
    }


  }
  filterItems1() {
    this.filterItems = this.titlelist.filter(item => (item.Title + item.Code).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  }


  del() {
    console.log(new Date().toLocaleDateString())

    //this.file.removeRecursively(this.file.externalApplicationStorageDirectory, "subha")

  }
  ok(item, code, title, imgurl) {
    this.imageurl = imgurl;
    this.titleforlocal = title;
    this.code = code;
    var data = { "AuthKey": this.userlog.AuthKey, "LibraryId": item };
    this.rest.attac(data).then(data => {
      if (data) {

        this.d = data;
        this.url = encodeURI(this.d);
        this.download();
      }

    })

  }

  public download() {

    if (localStorage.getItem('url')) {

      this.localstdata = JSON.parse(localStorage.getItem('url'));

      let i = this.localstdata.findIndex(item => {
        return item.title == this.titleforlocal
      }

      );

      if (i != -1) {

        this.fileOpener.appIsInstalled('com.faultexception.reader').then(data => {

          if (data.status == 1) {
            this.fileOpener.open(this.localstdata[i].url, 'application/epub+zip')

          }
          else {
            window.open("https://play.google.com/store/apps/details?id=com.faultexception.reader&hl=en", '_system')

          }

        })

      }
      else {

        let loading = this.loadingCtrl.create({
          content: 'Downloading Please wait...'
        });
        loading.present();

        this.fileTransfer = this.transfer.create();
        var currentDate: string = new Date().toLocaleDateString();
        this.dateget = currentDate;
        let dd = this.dateget.split('/');
        let firstName = dd[0];
        let sen = dd[1];
        let last = dd[2]
        let filan = dd[0] + dd[1] + dd[2]

        // localdatasave
        if (localStorage.getItem("FileName")) {
          console.log("folder exists")
        }
        else {
          localStorage.setItem("FileName", JSON.stringify(filan))
        }

        this.file.createDir(this.file.externalApplicationStorageDirectory, filan, true).then(data => {
          console.log(JSON.stringify(data.nativeURL))

          this.dirurl = data.nativeURL;

          this.fileTransfer.download(this.imageurl, this.dirurl + this.code + ".jpg", true).then((done) => {
            console.log('download completed: ' + done.toURL());

            localStorage.getItem("filename")
            this.fileTransfer.download(this.url, this.dirurl + this.code + ".epubv", true).then((entry) => {
              console.log('download completed: ' + entry.toURL());

              this.epuburl = entry.toURL();
              console.log(this.epuburl)
              // this.ofline=[{title:this.titleforlocal,url:this.epuburl,date:new Date().toLocaleDateString()}]
              this.arrnew.push({ "url": this.epuburl, "imgurl": done.toURL(), "title": this.titleforlocal, "code": this.code, "date": new Date().toLocaleDateString() })

              localStorage.setItem("url", JSON.stringify(this.arrnew))

              loading.dismiss();


              //file opener

              this.fileOpener.appIsInstalled('com.faultexception.reader').then(data => {
                if (data.status == 1) {
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
        })
      }
    }
    else {

      let loading = this.loadingCtrl.create({
        content: 'Downloading Please wait...'
      });
      loading.present();

      this.fileTransfer = this.transfer.create();
      var currentDate: string = new Date().toLocaleDateString();
      this.dateget = currentDate;
      let dd = this.dateget.split('/');
      let firstName = dd[0];
      let sen = dd[1];
      let last = dd[2]
      let filan = dd[0] + dd[1] + dd[2]


      if (localStorage.getItem("FileName")) {
        console.log("327 folder exists")
      }
      else {
        localStorage.setItem("FileName", JSON.stringify(filan))
      }

      this.file.createDir(this.file.externalApplicationStorageDirectory, filan, true).then(data => {
        console.log(JSON.stringify(data.nativeURL))
        this.dirurl = data.nativeURL;
        this.fileTransfer.download(this.imageurl, this.dirurl + this.code + ".jpg", true).then((done) => {
          console.log('download completed: ' + done.toURL());

          this.fileTransfer.download(this.url, this.dirurl + this.code + ".epubv", true).then((entry) => {
            console.log('download completed: ' + entry.toURL());

            this.epuburl = entry.toURL();
            this.arrnew.push({ "url": this.epuburl, "imgurl": done.toURL(), "title": this.titleforlocal, "code": this.code, "date": new Date().toLocaleDateString() })

            localStorage.setItem("url", JSON.stringify(this.arrnew))

            loading.dismiss();


            //file opener

            this.fileOpener.appIsInstalled('com.faultexception.reader').then(data => {
              console.log(JSON.stringify(entry.toURL()));
              if (data.status == 1) {
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
      })
    }

  }


  back() {
    this.platform.exitApp()
  }


  tem() {
    // this.file.createDir(this.file.externalRootDirectory,"dd",true)
    console.log(this.file.externalRootDirectory + "Download/")
    this.file.removeRecursively(this.file.externalRootDirectory, "dd")
  }

  doInfinite(infiniteScroll: any) {
    this.currentCount = this.endPage
    this.endPage = this.endPage + 10;
  
    this.arr = { "AuthKey": this.userlog.AuthKey, "TopicId": "", "CodeTitle": "", "RowFrom": this.currentCount, "RowCount": this.endPage }

    this.rest.sublist(this.arr).then(data => {
      this.newposts1 = data;
      this.newposts = this.newposts1;
      if (this.newposts.length) {
        for (let i in this.newposts) {
          this.filterItems.push(this.newposts[i]);
        }
      } else {
        this.pagingEnabled = false;
      }

      infiniteScroll.complete();
    });
  }
}
