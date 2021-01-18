import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodeserverService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3333/';
  }

  getList() {
    return this.http.get(this.url + 'list');
  }

  sendRoom(room: any) {
    return this.http.post(this.url + 'room', { room });
  }

  checkRoom(id: string) {
    return this.http.get(this.url + `getroom/${id}`);
  }
}
