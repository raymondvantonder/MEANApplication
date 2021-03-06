import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterUserModel } from 'src/app/_models/register-user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';

  @Output() registerUser = new EventEmitter<RegisterUserModel>();

  @Input()
  set isLoggedIn(value: boolean) {
    if (value) {
      this.router.navigateByUrl('home');
    }
  }

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'surname': [null, Validators.required],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'password': [null, [Validators.required, this.checkPassword]],
      'confirmPassword': [null, [Validators.required, this.checkPassword, this.passwordMatcher.bind(this)]],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.formGroup &&
      (control.value !== this.formGroup.controls.password.value)
    ) {
      return { confirmPasswords: true };
    }
    return null;
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter, one number and one special character)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter, one number and one special character' : '';
  }

  getErrorConfirmPassword() {
    return this.formGroup.get('confirmPassword').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter, one number and one special character)' :
      this.formGroup.get('confirmPassword').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter, one number and one special character' :
        this.formGroup.get('confirmPassword').hasError('confirmPasswords') ? 'Passwords does not match.' : '';
  }

  onSubmit(post) {
    console.log(post);
    this.registerUser.emit({
      name: post.name,
      surname: post.surname,
      email: post.email,
      password: post.password
    });
  }

}
