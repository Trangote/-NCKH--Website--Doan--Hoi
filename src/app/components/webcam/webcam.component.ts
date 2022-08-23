import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Chuongtrinh } from 'src/app/models/doanhoi.model';
import { ChuongtrinhService } from 'src/app/services/chuongtrinh.service';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css'],
})
export class WebcamComponent implements OnInit {
  @Input() diemdanh?: Chuongtrinh;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentDiemdanh: Chuongtrinh = {
    eventname: '',
    eventtype: '',
    scale: '',
    timeend: '',
    timestart: '',
    description: '',
    shortdescription: '',
    timeline: '',
    benefit: '',
    banner: '',
    img1gioithieu: '',
    img2benefit: '',
    img3timeline: '',
    fee: '',
    screative: '',
    straining: '',
    sconnect: '',
    sknow: '',
    sskill: '',
    cert: '',
  };
  message = '';
  constructor(private chuongtrinhService: ChuongtrinhService) {}

  ngOnInit(): void {
    this.message = '';
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }
  ngOnChanges(): void {
    this.message = '';
    this.currentDiemdanh = { ...this.diemdanh };
  }

  // toggle webcam on/off
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId?: any;
  videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  errors: WebcamInitError[] = [];

  // latest snapshot
  webcamImage?: WebcamImage | null;

  // webcam snapshot trigger
  trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  // public ngOnInit(): void {
  //   WebcamUtil.getAvailableVideoInputs().then(
  //     (mediaDevices: MediaDeviceInfo[]) => {
  //       this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
  //     }
  //   );
  // }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
