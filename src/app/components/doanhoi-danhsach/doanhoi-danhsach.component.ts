import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doanhoi-danhsach',
  templateUrl: './doanhoi-danhsach.component.html',
  styleUrls: ['./doanhoi-danhsach.component.css'],
})
export class DoanhoiDanhsachComponent implements OnInit {
  currentIndex = -1;
  doan = [
    'Đoàn trường ĐH Kinh tế - Luật',
    'Đoàn Khoa Toán Kinh tế',
    'Đoàn Khoa Tài chính - Ngân hàng',
    'Đoàn Khoa Quản trị kinh doanh',
    'Đoàn Khoa Luật',
    'Đoàn Khoa Luật Kinh tế',
    'Đoàn Khoa Kinh tế',
    'Đoàn Khoa Kinh tế Đối ngoại',
    'Đoàn Khoa Kế toán - Kiểm toán',
    'Đoàn Khoa Hệ thống thông tin',
  ];
  hoi = [
    'Hội sinh viên trường ĐH Kinh tế - Luật',
    'Liên Chi Hội Khoa Hệ thống thông tin',
    'Liên Chi Hội Khoa Kế toán - Kiểm toán',
    'Liên Chi Hội Khoa Kinh tế Đối ngoại',
    'Liên Chi Hội Khoa Kinh tế',
    'Liên Chi Hội Khoa Luật Kinh tế',
    'Liên Chi Hội Khoa Luật',
    'Liên Chi Hội Khoa Quản trị kinh doanh',
    'Liên Chi Hội Khoa Tài chính - Ngân hàng',
    'Liên Chi Hội Khoa Toán Kinh tế',
  ];
  clb = [
    'CLB Công nghệ tài chính',
    'CLB AI',
    'CLB FESE',
    'CLB ITB',
    'CLB Khởi nghiệp kinh doanh',
    'CLB Kinh doanh quốc tế (IBC)',
    'CLB Kinh tế học (ECS)',
    'CLB Kỹ Năng',
    'CLB Lý Luận Trẻ',
    'CLB Marketing',
    'CLB Nghiên cứu khoa học (ERC)',
    'CLB Nghiên cứu và tư vấn pháp luật (LRAC)',
    'CLB Sách và Hành động',
    'CLB Sáng tạo trẻ UEL (YCU)',
    'CLB Sinh viên 5 tốt',
    'CLB Tài chính - Ngân hàng (FBG)',
    'CLB Thắp sáng ước mơ',
    'CLB The Young Travel',
    'CLB Thể dục thể thao',
    'CLB Tiềm năng quản trị (GPA)',
    'CLB Tiếng Anh (EFFI)',
    'CLB Tiếng Hoa (WAN)',
    'CLB Tiếng Nhật (AKINA)',
    'CLB Truyền thông UEL (UEL360)',
    'CLB UEL Moot club',
    'CLB WAPA',
  ];
  doinhom = [
    'Chuyên san Kinh tế Tài chính Ngân hàng',
    'Đội Công tác xã hội',
    'Đội hình tư vấn và giảng dạy Pháp luật cộng đồng (CLE)',
    'Đội Hỗ trợ sinh viên nội trú',
    'Đội Kinh doanh vì cộng đồng (ENS)',
    'Đội Văn nghệ xung kích (VNB)',
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<div class="dialog">
    <div class="text-center">
      <i class="far fa-solid fa-circle-info fa-3x"></i>
    </div>
    <h2 class="text-center" mat-dialog-title>Coming soon...</h2>
    <div class="text-center" mat-dialog-content>
      Tính năng này chưa được hỗ trợ.
    </div>
  </div>`,
  styleUrls: ['./doanhoi-danhsach.component.css'],
})
export class DialogElementsExampleDialog {}
