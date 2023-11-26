import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  resize$ = new Subject<void>();

  resizeMap(): Observable<void> {
    return this.resize$.asObservable();
  }
}
