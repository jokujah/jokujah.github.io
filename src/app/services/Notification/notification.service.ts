import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(public snackBar: MatSnackBar) { }
  
  showSuccess(message: string): void {
    this.snackBar.open(message,'X');
  }
  
  showError(message: string): void {
    // The second parameter is the text in the button. 
    // In the third, we send in the css class for the snack bar.
    this.snackBar.open(message, 'X', {
      panelClass: ['errorMatSnackBar'],
      duration:10000
    });
  }

  showWarning(message: string): void {
    // The second parameter is the text in the button. 
    // In the third, we send in the css class for the snack bar.
    this.snackBar.open(message, 'X', {
      panelClass: ['errorMatSnackBar'],
      duration:10000
    });
  }
}
