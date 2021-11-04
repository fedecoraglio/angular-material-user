import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Observer } from 'rxjs';
import { AppRoutingModule } from '../../../app-routing.module';
import { UserService } from '../../../service/user.service';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListPage } from './user-list.page';

describe('UserListPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        UserListRoutingModule,
        HttpClientModule,
        AppRoutingModule,
        RouterTestingModule,
      ],
      declarations: [UserListPage],
      providers: [UserService],
    }).compileComponents();
  });

  it('should create the user list page', () => {
    const fixture = TestBed.createComponent(UserListPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fill users after call ngOnInit method', () => {
    TestBed.overrideComponent(UserListPage, {
      set: { providers: [{ provide: UserService, useClass: MockUserService }] },
    });
    const userListPage = TestBed.createComponent(UserListPage);
    const instance = userListPage.componentInstance;
    instance.ngOnInit();
    expect(instance.page).toEqual(1);
    expect(instance.pageCount).toEqual(3);
    expect(instance.total).toEqual(12);
  });
});

@Injectable()
export class MockUserService extends UserService {
  getUsers(page: number, pageSize: number) {
    return new Observable((observer: Observer<Object>) => {
      observer.next({
        page: 1,
        per_page: 5,
        total: 12,
        total_pages: 3,
        data: [
          {
            id: 1,
            email: 'george.bluth@reqres.in',
            first_name: 'George',
            last_name: 'Bluth',
            avatar: 'https://reqres.in/img/faces/1-image.jpg',
          },
          {
            id: 2,
            email: 'janet.weaver@reqres.in',
            first_name: 'Janet',
            last_name: 'Weaver',
            avatar: 'https://reqres.in/img/faces/2-image.jpg',
          },
          {
            id: 3,
            email: 'emma.wong@reqres.in',
            first_name: 'Emma',
            last_name: 'Wong',
            avatar: 'https://reqres.in/img/faces/3-image.jpg',
          },
          {
            id: 4,
            email: 'eve.holt@reqres.in',
            first_name: 'Eve',
            last_name: 'Holt',
            avatar: 'https://reqres.in/img/faces/4-image.jpg',
          },
          {
            id: 5,
            email: 'charles.morris@reqres.in',
            first_name: 'Charles',
            last_name: 'Morris',
            avatar: 'https://reqres.in/img/faces/5-image.jpg',
          },
        ],
        support: {
          url: 'https://reqres.in/#support-heading',
          text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
        },
      });
    });
  }
}
