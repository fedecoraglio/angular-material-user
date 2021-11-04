import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListPage } from './user-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    UserListRoutingModule,
  ],
  declarations: [UserListPage],
})
export class UserListModulePageModule {}
