export class Doanhoi {
  key?: string | null;
  username?: string;
  password?: string;
  published?: boolean;
}
export class Student {
  key?: string | null;
  fullname?: string;
  password?: string;
  published?: boolean;
}
export class Chuongtrinh {
  key?: string | null;
  eventname?: string;
  btcid?: string;
  btcname?: string;
  btcimages?: string;
  published?: boolean;
  eventtype?: string;
  scale?: string;
  timeend?: string;
  timestart?: string;
  description?: string;
  shortdescription?: string;
  timeline?: string;
  benefit?: string;
  banner?: string;
  img1gioithieu?: string;
  img2benefit?: string;
  img3timeline?: string;
  imgavatar?: string;
  fee?: string;
  sconnect?: string;
  sknow?: string;
  screative?: string;
  straining?: string;
  sskill?: string;
  cert?: string;
  ngayDangTai?: number;
  thongbao?: string;
  trangthai?: string;
  quyenloiopt?: string;
  ctxh?: string;
  drl?: string;
  giaithuong?: string;
  soluongdk?: number;
  quantam?: string;
}
export class User {
  key?: string | null;
  username?: string;
  email?: string;
  password?: string;
  phonenumber?: string;
  emailaddress?: string;
  studentcode?: string;
  fullname?: string;
  faculty?: string;
  submittype?: string;
  groupname?: string;
  groupmember?: string;
  memberfunction?: string;
  paymentimage?: string;
  checkinstatus?: boolean;
  checkintime?: string;
  khoa?: string;
  gender?: string;
  dateofbirth?: string;
}
export class Dangkythamgia {
  key?: string | null;
  eventid?: string | null;
  checkinstatus?: boolean;
  checkintime?: string;
  ngayDangTai?: number;
  timeend?: string;
  eventname?: string;
  ngayDangKy?: string;
}
export class Enrollmentlist {
  key?: string | null;
  userid?: string;
  checkinstatus?: boolean;
  imgpayment?: string;
  checkintime?: string;
  faculty?: string;
  khoa?: string;
  phonenumber?: string;
  fullname?: string;
  studentcode?: string;
  email?: string;
}
export class Thongbao {
  thongbao?: string;
  ngayTaoThongBao?: string;
}
export class Btc {
  btcname?: string;
  btcemail?: string;
  btcid?: string;
  password?: string;
  btcimages?: string;
  fanpagelink?: string;
}
