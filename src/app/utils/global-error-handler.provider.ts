import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ErrorService } from "../services/Error/error.service";
import { LoggingService } from "../services/Logging/logging.service";
import { NotificationService } from "../services/Notification/notification.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(
        private injector: Injector,
        private router: Router
        ) { }

    handleError(error: Error | HttpErrorResponse) {

        console.log(error);
        console.log(JSON.stringify(error instanceof HttpErrorResponse));

        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificationService);

        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            if (error.status === 401) {
                message = errorService.getServerMessage(error);
                stackTrace = errorService.getServerStack(error);
                notifier.showError(message);
                localStorage.removeItem('token');
                this.router.navigate(['/login']);
            }
            if (error.status === 0) {
                message = 'Failed to connect to Server. Check your Internet Connection or Contact System Administrator';
                stackTrace = errorService.getServerStack(error);
                notifier.showError(message);
            }
            else {
                message = errorService.getServerMessage(error);
                stackTrace = errorService.getServerStack(error);
                notifier.showError(message);            
            }
        } else if (error instanceof Error) {
            // Client Error
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
            notifier.showWarning(message);
        }

        // Always log errors
        logger.logError(message, stackTrace);

        //console.error(error);
    }
}