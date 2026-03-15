import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  isLoading : boolean = false
  successMsg : string = '';
  errorMsg : string = '';


  private readonly router  = inject(Router)
  private readonly authService = inject(AuthService)

  registerForm : FormGroup = new FormGroup ({

    name:new FormControl(null , [ Validators.required , Validators.minLength(3), Validators.maxLength(20)]),
    username:new FormControl(null , [ Validators.required , Validators.minLength(3), Validators.maxLength(20)]),
    email:new FormControl(null , [Validators.required, Validators.email]),
    dateOfBirth:new FormControl(null , [Validators.required]),
    gender:new FormControl(null, [Validators.required]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword:new FormControl(null , [Validators.required])

  }, {validators:this.confirmPassword} )


  signUp(){
    if(this.registerForm.valid){

      this.isLoading = true
      this.authService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          if(res.success){

            this.isLoading = false    

          console.log(res);

          this.successMsg = res.message
         this.errorMsg = ''


          }
          else{
            this.registerForm.markAllAsTouched();
          }


          
        },
        error:(err)=>{
          console.log(err);
          this.errorMsg = err.error.message
          this.successMsg = ''
          this.isLoading = false

        } ,
        complete:()=>{
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 2000);
        }
      })
    }
    
  }


  confirmPassword(group:any){

  let passwordValue =  group.get('password').value   
  let rePasswordValue =  group.get('rePassword').value   

    if(passwordValue==rePasswordValue){

      return null

    }
    else{
      return {mismatch:true }

    }
    



  }


}
