import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ListingPage } from '../pages/listing/listing';
import { InformationPage } from '../pages/information/information';
import { SplashPage } from '../pages/splash/splash';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ForgetPage } from '../pages/forget/forget';
import { LoginPage } from '../pages/login/login';
import { RestProvider } from '../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { ItemPage } from '../pages/item/item';
import { QuisPage } from '../pages/quis/quis';
import { ResultPage } from '../pages/result/result';
import { MylibPage } from '../pages/mylib/mylib';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
// import { ExpandableComponent } from '../components/expandable/expandable'
// Import library
// import { IonicTreeViewModule } from 'ionic-tree-view';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { ResourceTree } from '../components/resource-tree/resource-tree';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    QuisPage,
    // IonicTreeViewModule.forRoot(),   
     LoginPage,
    SplashPage,
    ResultPage,
    ItemPage,
    MylibPage,
    // ResourceTree,
    // ExpandableComponent,
    InformationPage,
    ForgetPage,
    ListingPage
   
  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    // IonicTreeViewModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    InformationPage,
    SplashPage,
    LoginPage,
    ItemPage,
    ResultPage,
    QuisPage,
    MylibPage,
    ForgetPage,
    // ResourceTree,
    ListingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    FileTransfer, 
    FileOpener,
    Network,
    FileTransferObject, 
    File
  ]
})
export class AppModule {}
