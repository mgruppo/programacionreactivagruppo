import { Component, OnDestroy } from '@angular/core';
import { TimeService } from '../../core/services/time.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  horaActual$: Observable<string>;

  //se utiliza para mostrar el valor e implementar el OnDestroy
  horaActualNoAsync: string | null = null;

  suscriptionRef: Subscription | null;

  constructor(private timeService: TimeService) {
    this.horaActual$ = this.timeService.reloj;

    this.suscriptionRef = this.timeService.reloj.subscribe((valor) => {
      this.horaActualNoAsync = valor;
    });
  }

  ngOnDestroy(): void {
    this.suscriptionRef?.unsubscribe();
  }
}
