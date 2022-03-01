import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
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
    this.authService.loginUser(this.form.value).subscribe(data => {
      console.log(data);
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      // this.reloadPage();
      // this.router.navigate(['../../home'], { relativeTo: this.route });
      this.router.navigateByUrl('/home')
    })
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getUser)
      console.log(this.tokenStorage.getToken)
      this.isLoggedIn = true;
    }
  }

  reloadPage():void{
    window.location.reload();
  }

}
