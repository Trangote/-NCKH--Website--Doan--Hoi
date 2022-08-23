import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { DoanhoiListComponent } from './components/doanhoi-list/doanhoi-list.component';
import { AddChuongtrinhComponent } from './components/add-chuongtrinh/add-chuongtrinh.component';
import { ChuongtrinhDetailComponent } from './components/chuongtrinh-detail/chuongtrinh-detail.component';
import { ChuongtrinhListComponent } from './components/chuongtrinh-list/chuongtrinh-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DangkyCanhanComponent } from './components/dangky-canhan/dangky-canhan.component';
import { DoanhoiChitietComponent } from './components/doanhoi-chitiet/doanhoi-chitiet.component';
import { ChuongtrinhChitietSvComponent } from './components/chuongtrinh-chitiet-sv/chuongtrinh-chitiet-sv.component';
import { QlctThongkeOneComponent } from './components/qlct-thongke-one/qlct-thongke-one.component';
import { QlctChungnhanComponent } from './components/qlct-chungnhan/qlct-chungnhan.component';
import { DangnhapComponent } from './components/dangnhap/dangnhap.component';
import { DanhsachCtSvComponent } from './components/danhsach-ct-sv/danhsach-ct-sv.component';
import { WebcamComponent } from './components/webcam/webcam.component';
import { LichsuDangkyComponent } from './components/lichsu-dangky/lichsu-dangky.component';
import { DoanhoiDanhsachComponent } from './components/doanhoi-danhsach/doanhoi-danhsach.component';
import { QlctThongbaoComponent } from './components/qlct-thongbao/qlct-thongbao.component';
import { QlctDiemdanhComponent } from './components/qlct-diemdanh/qlct-diemdanh.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'doanhoi', component: DoanhoiListComponent },
  { path: 'chuongtrinh', component: AddChuongtrinhComponent },
  { path: 'detail', component: ChuongtrinhDetailComponent },
  { path: 'chuongtrinhlist', component: ChuongtrinhListComponent },
  { path: 'user', component: AddUserComponent },
  { path: 'user1', component: DangkyCanhanComponent },
  { path: 'doanhoichitiet', component: DoanhoiChitietComponent },
  {
    path: 'chitietchuongtrinh',
    component: ChuongtrinhChitietSvComponent,
  },
  { path: 'thongkeone', component: QlctThongkeOneComponent },
  { path: 'addcert', component: QlctChungnhanComponent },
  { path: 'dangnhap', component: DangnhapComponent },
  { path: 'chuongtrinhSV', component: DanhsachCtSvComponent },
  { path: 'webcam', component: WebcamComponent },
  { path: 'taikhoanuser', component: LichsuDangkyComponent },
  { path: 'danhsachdoanhoi', component: DoanhoiDanhsachComponent },
  { path: 'thongbao', component: QlctThongbaoComponent },
  { path: 'diemdanh', component: QlctDiemdanhComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
