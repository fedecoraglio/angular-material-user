import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.css'],
})
export class UserFormPage {
  wait = false;
  editUser: any = null;
  message: string | null = null;
  errorMsg: string | null = null;
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  userForm = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.maxLength(100)]],
    lastname: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ],
    ],
  });

  public errorMessages = {
    firstname: [
      { type: 'required', message: 'Se requiere un nombre' },
      { type: 'maxlenght', message: 'Por favor, introduce un nombre válido' },
    ],
  };

  ngOnInit() {
    this.message = null;
    this.errorMsg = null;
    this.activatedRoute.params.subscribe((params: any) => {
      if (!!params.id) {
        this.userService.getUserById(params.id).subscribe((resp: any) => {
          this.editUser = resp.data;
          this.userForm.get('firstname')?.setValue(resp.data.first_name);
          this.userForm.get('lastname')?.setValue(resp.data.last_name);
          this.userForm.get('email')?.setValue(resp.data.email);
        });
      }
    });
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }

  saveUser() {
    if (this.userForm.valid) {
      this.wait = true;
      const data = {
        first_name: this.userForm.get('firstname')?.value,
        last_name: this.userForm.get('lastname')?.value,
        email: this.userForm.get('email')?.value,
      };
      if (!!this.editUser) {
        this.userService.updateUser(this.editUser.id, data).subscribe(
          (resp: any) => {
            this.processSuccefully(
              'The user was updated successfully. Redirecting to user list...'
            );
          },
          (err) => {
            this.errorMsg = err;
          }
        );
      } else {
        this.userService.saveUser(data).subscribe(
          (resp: any) => {
            this.processSuccefully(
              'The user was created successfully. Redirecting to user list...'
            );
          },
          (err) => {
            this.errorMsg = err;
          }
        );
      }
    }
  }

  private processSuccefully(message: string) {
    this.message = message;
    this.userForm.reset();
    this.wait = false;
    setTimeout(() => {
      this.goToUserList();
    }, 4000);
  }
}
