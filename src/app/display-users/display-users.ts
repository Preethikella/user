import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService, User } from '../registration.service';
import { Router } from '@angular/router';
import { RecordService } from '../RecordService';

@Component({
  selector: 'app-display-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-users.html',
  styleUrl: './display-users.css',
})
export class DisplayUsers implements OnInit{
  users: User[] = [];
  selectedEmails: string[] = [];
  constructor(private registrationService:  RegistrationService, private router: Router , private recordService: RecordService) { 
    
  }
  ngOnInit() {
      this.fetchUsers();  
  }   

  fetchUsers(){
      this.recordService.getRecords().subscribe({
      next: (data : User[]) => {
        console.log('Records fetched successfully:', data);
        this.users = data;
      },
      error: (error : User[]) => {
        console.error('Error fetching records:', error);
      }
    });
  }

  goToRegistration(){
    this.router.navigateByUrl('');
  }

  toggleSelection(email: string | undefined, checked: boolean) {
    if (!email) return;

    if (checked) {
      this.selectedEmails.push(email);
    } else {
      this.selectedEmails = this.selectedEmails.filter(e => e !== email);
    }
  }

  ClearData(){
    this.selectedEmails.forEach(email => {
      this.recordService.deleteRecord(email).subscribe({
        next: (response) => {
          console.log(`Record with email ${email} deleted successfully:`, response);
          alert(`Record with email ${email} deleted successfully`);
          this.fetchUsers();
        },
        error: (error) => {
          console.error(`Error deleting record with email ${email}:`, error);
        }
      });
  });
  }
}
