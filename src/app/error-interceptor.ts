import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


  constructor(private dialog: MatDialog) {}


  //angular will call this method for request leaving your app
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    //handle gives us back response stream to listen to  responses
    //we use the pipe operator to add on the stream
    //catcherror enables you to handle http errors
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        let errorMessage = "An Unknown Error Message Occurred";

        if(error.error.message)
        {
          errorMessage = error.error.message;
        }
          this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
          //we have to return an observable
          return throwError(error);
      })
    );
  }

}
