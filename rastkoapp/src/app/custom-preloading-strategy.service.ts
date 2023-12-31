import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    
    if(route.data && route.data['preload']){
      console.log("preloading...");
      return load();
    }else{
      return of(null); //Observable<null>
    }
  }
}
