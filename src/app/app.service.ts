import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpclient:HttpClient) { }

  public getRegister(): any {
    return this.httpclient.get('/assets/db/registers.json')
  }
}
