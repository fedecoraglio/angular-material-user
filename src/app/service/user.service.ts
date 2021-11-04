import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number) {
    return this.http.get(`${this.urlApi}?page=${page}&per_page=${pageSize}`);
  }

  saveUser(data: any) {
    return this.http.post(`${this.urlApi}`, {
      ...data,
    });
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.urlApi}/${id}`, {
      ...data,
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.urlApi}/${id}`);
  }

  getUserById(id: string) {
    return this.http.get(`${this.urlApi}/${id}`);
  }
}
