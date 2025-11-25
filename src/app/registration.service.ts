import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
}

const STORAGE_KEY = 'app_users_v1';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  save(user: User) {
    const users = this.getAll();
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  getAll(): User[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as User[];
    } catch {
      return [];
    }
  }

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
