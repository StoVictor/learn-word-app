import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Room {
  user1: string;
  user2?: string;
  id: string;
  pack: any;
}

@Injectable({
  providedIn: 'root',
})
export class NodeserverService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3333/';
  }

  getList(): Observable<Room[]>{
    return this.http.get<Room[]>(this.url + 'list');
  }

  sendRoom(room: any) {
    return this.http.post(this.url + 'room', { room });
  }

  checkRoom(id: string) {
    return this.http.get(this.url + `getroom/${id}`);
  }
}
