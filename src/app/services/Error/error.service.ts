import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
        return error.message ? error.message : error.toString();
    }

    getClientStack(error: Error): string {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return (error?.error?.message) ? (error?.error?.message) : 'Server error. Contact the System Administrator';
    }

    getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return 'stack';
    }
}
