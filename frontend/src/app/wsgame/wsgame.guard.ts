import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { NodeserverService } from '../nodeserver.service';

@Injectable({ providedIn: 'root' })
export class WsgameGuard implements CanActivate {
  data: boolean;
  constructor(private noodeserver: NodeserverService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    const promise = this.noodeserver.checkRoom(id).toPromise();
    await promise.then(async (data: any) => await (this.data = data.free));
    if (this.data) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
