import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$: Observable<firebase.User>;

  constructor(
      private userService: UserService,
      private afAuth: AngularFireAuth,
      private route: ActivatedRoute,
      private router: Router) {
    this.user$ = afAuth.authState;
   }

  login() {
    const returnUrl = this.route.snapshot
      .queryParamMap.get('returnUrl') || '/';
    this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigateByUrl(returnUrl);
      });
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
     return this.user$
    .pipe(switchMap(user => {
      if (user) {  return this.userService.get(user.uid); }

      return of(null);

    }));
  }
}
