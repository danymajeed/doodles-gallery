import { HttpCancelService } from './http-cancel.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {
  constructor(private httpCancelService: HttpCancelService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()));
  }
}
