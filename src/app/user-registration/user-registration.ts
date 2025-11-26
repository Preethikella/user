import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.css',
})
export class UserRegistration {
  constructor(private router: Router, private registrationService: RegistrationService) { 
  }

onSubmit(form?: NgForm) {
  if (form && form.valid) {
    let name = form.controls['name'].value;
    let email = form.controls['email'].value;
    const saved = this.registrationService.save({name, email});
    if (saved) {
      alert('Registration successful!');
      form.resetForm();
    } else {
      alert('Email already exists!');
    }
  } else {
    console.log('Form is invalid');
  }
}

  goToUsers(){
    this.router.navigateByUrl('/display-users');
  }
}
