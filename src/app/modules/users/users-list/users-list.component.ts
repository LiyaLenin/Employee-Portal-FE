import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  page:number=1;
  allusers: UserSchema[] = []
  searchKey: string = ""
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
  generatePDF() {
    let pdf = new jspdf()
    let head = [['EmpId', 'Username', 'Email', 'Status']]
    let body: any = []
    this.allusers.forEach((item: any) => {
      if (item.id != '1') {
        body.push([item.empId, item.name, item.email, item.status])

      }
    })
    pdf.setFontSize(16)
    pdf.text("All Users List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save("alluserslist.pdf")
  }
  sortByName(){
    this.allusers.sort((user1:any,user2:any)=>user1.name.localeCompare(user2.name))
  }
  sortById(){
    this.allusers.sort((user1:any,user2:any)=>user1.name.localeCompare(user2.empId))
  }

}
