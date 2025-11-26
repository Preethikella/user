import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-users.html',
  styleUrl: './display-users.css',
})
export class DisplayUsers implements OnInit{
  users: any[] = [];

  constructor(private registrationService:  RegistrationService, private router: Router){ 
    
  }
  ngOnInit() {
   this.users = this.registrationService.getAll();
  }

  goToRegistration(){
    this.router.navigateByUrl('');
  }

  ClearData(){
    this.registrationService.clear();
    this.users = [];
  }
}
