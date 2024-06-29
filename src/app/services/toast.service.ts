import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root' 
})
export class ToastAlertService {

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, info: string) {
    this.toastr.success(info, message, {
      closeButton: true,
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    });
  }

  showError(message: string, info: string) {
    this.toastr.error(info, message, {
      closeButton: true,
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    });
  }
}