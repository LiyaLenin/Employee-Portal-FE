import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""
 constructor(private toaster: ToastrService,private api:AdminService,private router:Router){

 }
  login(){
    //admin login logic
    if(this.email && this.password){
      // this.toaster.success('Proceeed to api call')
      this.api.getAdminDetails().subscribe({
        next:(res:any)=>{
          console.log(res);
          const{email,password}=res
          if(email==this.email&& password==this.password){
            this.toaster.success('Login Successfull')
            sessionStorage.setItem("adminDetails",JSON.stringify(res))
            this.email=""
            this.password=""
            //navigate
            this.router.navigateByUrl("/dashboard")
             
          }else{
            this.toaster.error('Invalid Email/password')
          }
        },
        error:(reson:any)=>{
          console.log(reson.message);
        }
      })
    }
    else{
      alert('please fill the form completely')
    }
  }

}
