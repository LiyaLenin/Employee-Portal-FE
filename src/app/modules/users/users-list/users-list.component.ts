import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  allusers: UserSchema[] = []
  constructor(private api: ApiService, private toaster: ToastrService) { }
  ngOnInit(): void {
    this.getAllUsersList()
  }

  getAllUsersList() {
    this.api.getAllUserAPI().subscribe({
      next: (result: any) => {
        this.allusers = result
        console.log(this.allusers);

      },
      error: (reason: any) => {
        console.log(reason);

      }
    })
  }
  deleteUser(id: any) {
    this.api.removeUserAPI(id).subscribe((res: any) => {
      this.toaster.success("User Removed!!!")
      this.getAllUsersList()
    })
  }

}
