import { Routes } from '@angular/router';
import { UserRegistration } from './user-registration/user-registration';
import {DisplayUsers} from './display-users/display-users';

export const routes: Routes = [
	{ path: '', component: UserRegistration },
  { path: 'display-users' , component: DisplayUsers}
];
