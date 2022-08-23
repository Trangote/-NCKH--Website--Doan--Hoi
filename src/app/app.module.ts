import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  CountdownModule,
  CountdownEvent,
  CountdownConfig,
} from 'ngx-countdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { TestComponent } from './test/test.component';
import { DoanhoiDetailsComponent } from './components/doanhoi-details/doanhoi-details.component';
import { DoanhoiListComponent } from './components/doanhoi-list/doanhoi-list.component';
import { AddChuongtrinhComponent } from './components/add-chuongtrinh/add-chuongtrinh.component';
import { ChuongtrinhDetailComponent } from './components/chuongtrinh-detail/chuongtrinh-detail.component';
import { ChuongtrinhListComponent } from './components/chuongtrinh-list/chuongtrinh-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DangkyCanhanComponent } from './components/dangky-canhan/dangky-canhan.component';
import { DoanhoiChitietComponent } from './components/doanhoi-chitiet/doanhoi-chitiet.component';
import { QlctChungnhanComponent } from './components/qlct-chungnhan/qlct-chungnhan.component';
import { QlctDiemdanhComponent } from './components/qlct-diemdanh/qlct-diemdanh.component';
import { DoanhoiDanhsachComponent } from './components/doanhoi-danhsach/doanhoi-danhsach.component';
import { LichsuDangkyComponent } from './components/lichsu-dangky/lichsu-dangky.component';
import { QlctThongbaoComponent } from './components/qlct-thongbao/qlct-thongbao.component';
import { QlctThongkeOneComponent } from './components/qlct-thongke-one/qlct-thongke-one.component';
import { DangnhapComponent } from './components/dangnhap/dangnhap.component';
import { ChuongtrinhChitietSvComponent } from './components/chuongtrinh-chitiet-sv/chuongtrinh-chitiet-sv.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThongbaoAddComponent } from './components/thongbao-add/thongbao-add.component';
import { DanhsachCtSvComponent } from './components/danhsach-ct-sv/danhsach-ct-sv.component';
import { WebcamModule } from 'ngx-webcam';
import { WebcamComponent } from './components/webcam/webcam.component';
import { HttpClientModule } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CountUpDirective } from './count-up.directive';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CtGoiyComponent } from './components/ct-goiy/ct-goiy.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CheckinDetailComponent } from './components/checkin-detail/checkin-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    DoanhoiDetailsComponent,
    DoanhoiListComponent,
    AddChuongtrinhComponent,
    ChuongtrinhDetailComponent,
    ChuongtrinhListComponent,
    HomepageComponent,
    AddUserComponent,
    DangkyCanhanComponent,
    DoanhoiChitietComponent,
    QlctChungnhanComponent,
    QlctDiemdanhComponent,
    DoanhoiDanhsachComponent,
    LichsuDangkyComponent,
    QlctThongbaoComponent,
    QlctThongkeOneComponent,
    DangnhapComponent,
    ChuongtrinhChitietSvComponent,
    ThongbaoAddComponent,
    DanhsachCtSvComponent,
    WebcamComponent,
    CountUpDirective,
    CtGoiyComponent,
    CheckinDetailComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    WebcamModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    MatDialogModule,
    CountdownModule,
    NgApexchartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(
      environment.firebaseApp,
      'WEBSITE DOAN HOI'
    ),
    AngularFireAuthModule,
    FormsModule,
    AngularFireDatabaseModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'homepage/:key', component: ChuongtrinhChitietSvComponent },
      { path: 'chuongtrinhSV/:key', component: ChuongtrinhChitietSvComponent },
      { path: 'user1/:key', component: DangkyCanhanComponent },
      { path: 'thongkeone/:key', component: QlctThongkeOneComponent },
      { path: 'thongbao/:key', component: QlctThongbaoComponent },
      { path: 'detail/:key', component: ChuongtrinhDetailComponent },
      { path: 'diemdanh/:key', component: QlctDiemdanhComponent },
      { path: 'goiy/:key', component: ChuongtrinhChitietSvComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
