import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  resize$ = new Subject<boolean>();

  resizeMap(): Observable<boolean> {
    return this.resize$.asObservable();
  }
}
