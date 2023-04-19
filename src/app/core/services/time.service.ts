import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface Time {
  horas: number;
  minutos: number;
  segundos: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private _reloj$ = new BehaviorSubject<Time>(this.tiempoActual);

  constructor() {
    setInterval(() => {
      this._reloj$.next(this.tiempoActual);
    },1000) 
   }

  get reloj(): Observable<string> {
    return this._reloj$.asObservable().pipe(map((time) => {
      return `${time.horas}:${time.minutos}:${time.segundos}`
    }));
  }

  get tiempoActual(): Time {
    
    const now = new Date();
    
    return {
      horas: now.getHours(),
      minutos: now.getMinutes(),
      segundos: now.getSeconds(),
    }
  }

}
