import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate>
{
  canDeactivate(
    component: ComponentCanDeactivate
  ): boolean | Observable<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    console.log(component);
    return component?.canDeactivate() ? true : false;
  }
}
