import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('user_token');
  const router = inject(Router);

  if (token) {
    router.navigate([''])
    return true
  } else {
    return false
  }
};
