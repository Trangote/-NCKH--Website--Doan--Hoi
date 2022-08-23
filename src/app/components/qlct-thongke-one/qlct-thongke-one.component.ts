import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ExcelServicesService } from 'src/app/services/excel-services.service';
import { Chuongtrinh, Enrollmentlist } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
} from 'ng-apexcharts';
import { ActivatedRoute } from '@angular/router';

type ApexXAxis = {
  type?: 'category' | 'datetime' | 'numeric';
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  // column
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  grid: ApexGrid | any;
  colors: string[] | any;
  legend: ApexLegend | any;
  // pie
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
};

@Component({
  selector: 'app-qlct-thongke-one',
  templateUrl: './qlct-thongke-one.component.html',
  styleUrls: ['./qlct-thongke-one.component.css'],
})
export class QlctThongkeOneComponent implements OnInit {
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  chuongtrinh?: Chuongtrinh[];
  enrollmentlist?: Enrollmentlist[];
  soluongdk?: number;
  message = '';
  khoahttt?: number;
  khoaktdn?: number;
  khoaqtkd?: number;
  khoakt?: number;
  khoaktkt?: number;
  khoal?: number;
  khoalkt?: number;
  khoatkt?: number;
  khoatcnh?: number;

  khoa: Array<number> = [];

  k18?: number;
  k19?: number;
  k20?: number;
  k21?: number;
  khoak: Array<number> = [];
  currentIndex = -1;
  getchuongtrinh?: Array<Chuongtrinh> = [];
  chuongtrinhgetduoc?: Chuongtrinh | any;
  //column
  @ViewChild('chart1')
  chart1: ChartComponent = new ChartComponent();
  chartOptions1!: Partial<ChartOptions>;
  //pie
  @ViewChild('chart2')
  chart: ChartComponent = new ChartComponent();
  chartOptions!: Partial<ChartOptions>;

  constructor(
    public chuongtrinhService: ChuongtrinhService,
    private route: ActivatedRoute
  ) {}
  ngOnChanges(): void {}
  ngOnInit(): void {
    this.retrieveSoluongthongke();
  }
  title = 'angular-app';
  fileName = 'Danh sách sinh viên.xlsx';
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  retrieveSoluongthongke() {
    this.chuongtrinhService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        var routeParams = this.route.snapshot.paramMap;
        var productIdFromRoute = routeParams.get('key');
        this.getchuongtrinh = [];
        this.chuongtrinhgetduoc = data.filter(
          (x) => x.key == productIdFromRoute
        );
        this.getchuongtrinh?.push(this.chuongtrinhgetduoc);
        for (let i = 0; i < this.chuongtrinhgetduoc.length; i++) {
          this.chuongtrinhService
            .getdanhsachuserdadangky(this.chuongtrinhgetduoc[i])
            .snapshotChanges()
            .pipe(
              map((changes) =>
                changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
              )
            )
            .subscribe((data) => {
              this.enrollmentlist = data;
              this.soluongdk = this.enrollmentlist.length;
              var soluongsvkhoahttt = this.enrollmentlist.filter(
                (s) => s.faculty == 'Khoa Hệ thống thông tin'
              );
              this.khoahttt = soluongsvkhoahttt.length;
              var soluongsvkhoakt = this.enrollmentlist.filter(
                (s) => s.faculty == 'Khoa Kinh tế'
              );
              this.khoakt = soluongsvkhoakt.length;
              var soluongsvkhoaktdn = this.enrollmentlist.filter(
                (s) => s.faculty == 'Khoa Kinh tế đối ngoại'
              );
              this.khoaktdn = soluongsvkhoaktdn.length;
              var soluongsvkhoal = this.enrollmentlist.filter(
                (s) => s.faculty == 'Khoa Luật'
              );
              this.khoal = soluongsvkhoal.length;
              var soluongsvkhoalkt = this.enrollmentlist.filter(
                (s) => s.faculty == 'Khoa Luật Kinh tế'
              );
              this.khoalkt = soluongsvkhoalkt.length;
              var soluongsvkhoatcnh = this.enrollmentlist.filter(
                (s) => s.faculty == 'Khoa Tài chính - Ngân hàng'
              );
              this.khoatcnh = soluongsvkhoatcnh.length;
              var soluongsvkhoaqtkd = this.enrollmentlist.filter(
                (s) => s.faculty == 'Khoa Quản trị kinh doanh'
              );
              this.khoaqtkd = soluongsvkhoaqtkd.length;
              var soluongsvkhoatkt = this.enrollmentlist.filter(
                (s) => s.faculty == 'Khoa Toán Kinh tế'
              );
              this.khoatkt = soluongsvkhoatkt.length;
              var soluongsvkhoaktkt = this.enrollmentlist.filter(
                (s) => s.faculty == 'Khoa Kế toán - Kiểm toán'
              );
              this.khoaktkt = soluongsvkhoaktkt.length;
              var soluongsvkhoak18 = this.enrollmentlist.filter(
                (s) => s.khoa == 'K18'
              );
              this.k18 = soluongsvkhoak18.length;
              var soluongsvkhoak19 = this.enrollmentlist.filter(
                (s) => s.khoa == 'K19'
              );
              this.k19 = soluongsvkhoak19.length;
              var soluongsvkhoak20 = this.enrollmentlist.filter(
                (s) => s.khoa == 'K20'
              );
              this.k20 = soluongsvkhoak20.length;
              var soluongsvkhoak21 = this.enrollmentlist.filter(
                (s) => s.khoa == 'K21'
              );
              this.k21 = soluongsvkhoak21.length;
              this.khoa = [
                this.khoahttt,
                this.khoakt,
                this.khoaktdn,
                this.khoaktkt,
                this.khoal,
                this.khoalkt,
                this.khoatkt,
                this.khoatcnh,
                this.khoaqtkd,
              ];
              this.khoak = [this.k18, this.k19, this.k20, this.k21];
              this.chartOptions1 = {
                series: [
                  {
                    name: 'Quantity',
                    data: this.khoak,
                  },
                ],
                chart: {
                  height: 350,
                  type: 'bar',
                },
                colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
                plotOptions: {
                  bar: {
                    columnWidth: '45%',
                    distributed: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                legend: {
                  show: false,
                },
                grid: {
                  show: false,
                },
                xaxis: {
                  categories: ['K18', 'K19', 'K20', 'K21'],
                  labels: {
                    style: {
                      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
                      fontSize: '12px',
                    },
                  },
                },
              };
              this.chartOptions = {
                series: this.khoa,
                chart: {
                  width: 700,
                  type: 'pie',
                },
                labels: [
                  'Khoa Hệ thống thông tin',
                  'Khoa Kinh tế',
                  'Khoa Kinh tế đối ngoại',
                  'Khoa Kế toán - Kiểm toán',
                  'Khoa Luật',
                  'Khoa Luật Kinh tế',
                  'Khoa Toán Kinh tế',
                  'Khoa Tài chính - Ngân hàng',
                  'Khoa Quản trị kinh doanh',
                ],
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
              };
            });
        }
      });
  }
}
