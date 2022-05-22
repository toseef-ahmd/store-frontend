/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core'
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  constructor() {}

  loadAnimation(type: string, text: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer),
          toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    Toast.fire({
      icon: type as SweetAlertIcon,
      title: text,
    })
  }
}
