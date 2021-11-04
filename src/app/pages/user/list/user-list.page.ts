import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.css'],
})
export class UserListPage {
  private users: any[] = [];
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'avatar',
    'actions',
  ];
  page = 1;
  pageCount = 1;
  total = 0;
  wait = false;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.users = [];
    this.loadUsers(1, 5);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onUserPageChange(_event: any) {
    if (!!this.paginator) {
      this.loadUsers(this.paginator.pageIndex + 1, this.paginator.pageSize);
    }
  }

  delete(row: any) {
    //TODO: we should add confirm dialog.
    this.userService.deleteUser(row.id).subscribe(() => {
      const temp = this.dataSource.data.filter((r: any) => r.id !== row.id);
      this.dataSource = new MatTableDataSource(temp);
    });
  }

  goToNewUser() {
    this.router.navigate(['/new-user']);
  }

  gotToEditUser(row: any) {
    this.router.navigate([`/edit-user/${row.id}`]);
  }

  private loadUsers(page: number, pageSize: number) {
    this.userService.getUsers(page, pageSize).subscribe((resp: any) => {
      this.users = resp.data;
      this.page = resp.page;
      this.pageCount = resp.total_pages;
      this.total = resp.total;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }
}
