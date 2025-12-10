import { Routes } from '@angular/router';
import { UserRegistration } from './user-registration/user-registration';
import {DisplayUsers} from './display-users/display-users';
import { FetchUsers } from './fetch-users/fetch-users';
import { UpdateUser } from './update-user/update-user';

export const routes: Routes = [
	{ path: '', component: UserRegistration },
  { path: 'display-users' , component: DisplayUsers},
  { path: 'fetch-users' , component: FetchUsers},
  {path:'update-user', component: UpdateUser}
];
