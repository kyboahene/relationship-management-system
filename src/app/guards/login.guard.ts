import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService)
  const router = inject(Router);

  const token = storageService.getToken()

  if (token) {
    router.navigate([''])
    return false
  } else {
    return true
  }
};
