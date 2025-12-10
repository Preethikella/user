import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistrationService, User } from '../registration.service';
import { RecordService } from '../RecordService';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.css',
})
export class UserRegistration {
  constructor(private router: Router, private registrationService: RegistrationService , private recordService: RecordService) { 
  }

  onSubmit(form?: NgForm) {
    if (form && form.valid) {
      let name = form.controls['name'].value;
      let email = form.controls['email'].value;
      this.recordService.getRecordsByEmail(email).subscribe({
        next: (data : User[]) => {
          if(data.length > 0){      
              alert('A user with this email already exists.');
              return;
          }else{
              this.saveRecord(name, email);
              alert('Registration successful!');
              form.reset();
          }
        }
      });
      
    }
  }

  saveRecord(name: string, email: string) {
      const user = { name, email };
      this.recordService.saveRecord(user).subscribe({  
        next: (response) => {
          console.log('Record saved successfully:', response);
        },
        error: (error) => {
          console.error('Error saving record:', error);
        }
      });
  }

  goToUsers(){
    this.router.navigateByUrl('/display-users');
  }

  goToFetchUsers(){
    this.router.navigateByUrl('/fetch-users');
  }

  updateUsers(){
    this.router.navigateByUrl('/update-user');
  }
  
}
