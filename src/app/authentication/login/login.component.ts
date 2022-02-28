import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { 
    this.form = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.form.controls; }

  loginUser(): void {
    this.submitted = true;

    if (this.form.invalid){
      return;
    }

    this.loading = true;
    console.log(this.form.value);
    this.authService.loginUser(this.form.value).subscribe(() => {
      console.log();
      this.router.navigateByUrl('/')
    })
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }

}
