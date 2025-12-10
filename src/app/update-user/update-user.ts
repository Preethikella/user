import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RecordService } from '../RecordService';


@Component({
  selector: 'app-update-user',
   imports: [CommonModule, FormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css',
})
export class UpdateUser {

  constructor(private recordService: RecordService) {
  }

  updateRecord( form?: NgForm) {
    if (form && form.valid) {
          let name = form.controls['name'].value;
          let email = form.controls['email'].value;
          const updatedUser = { name, email };
          this.recordService.updateRecord(email, updatedUser).subscribe({
          next: (response) => {
            alert('User updated successfully!');
              console.log('Record updated successfully:', response);    
        },
        error: (error) => {
              alert('Given email does not exist.');
              console.error('Error updating record:', error);
            }
        });
  }
}

}
