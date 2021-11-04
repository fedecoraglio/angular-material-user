import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/user/list/user-list.module').then(
        (m) => m.UserListModulePageModule
      ),
  },
  {
    path: 'new-user',
    loadChildren: () =>
      import('./pages/user/form/user-form.module').then(
        (m) => m.UserFormModulePageModule
      ),
  },
  {
    path: 'edit-user/:id',
    loadChildren: () =>
      import('./pages/user/form/user-form.module').then(
        (m) => m.UserFormModulePageModule
      ),
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
