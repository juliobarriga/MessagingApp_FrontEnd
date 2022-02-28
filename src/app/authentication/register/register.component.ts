import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/_services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private registrationService: RegistrationService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) {
      this.form = this.formBuilder.group({
        phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        userName: ['', Validators.required],
        birthDate: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
     }

  get f() { return this.form.controls; }

  registerUser(): void {
    this.submitted = true;

    if (this.form.invalid){
      return;
    }

    this.loading = true;
    console.log(this.form.value);
    this.registrationService.registerUser(this.form.value).subscribe(data => {
      console.log(data);
    })
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    
  }

}
