import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecordService } from '../RecordService';
import { User } from '../registration.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-fetch-users',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './fetch-users.html',
  styleUrl: './fetch-users.css',
})
export class FetchUsers {
  usersByEmail: User | null = null;
  error: string | null = null;
  showErroMessage = false;

  constructor(private recordService: RecordService , private cdr: ChangeDetectorRef) {}

  fetchByEmail(email?: string) {
    const q = (email ?? '').trim();
    if (!q) {
      this.showErroMessage = true;
      this.error = 'Please enter an email address';
      return;
    }
    this.showErroMessage = false;;
    this.recordService.getRecordsByEmail(q).subscribe({
        next: (data : User[]) => {
          console.log('Fetched records by email:', data);
          this.usersByEmail = data[0];
          this.cdr.detectChanges();
        },
        error: (err) => {
            console.error('Error fetching records:', err);
        }
    });
  }
}
