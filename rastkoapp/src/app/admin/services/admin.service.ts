import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser, User } from '../../entities';


@Injectable()
export class AdminService {

  private path : string = environment.apiGate;
  onAddedUser = new Subject<NewUser>();

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.path + 'admin/registration');
  }

  createNewUser(newUser : NewUser){
    this.http.post<NewUser>(this.path + 'admin/registration',
                   newUser
        ).subscribe({
          next : (response)=>{
            console.log(response)
            this.onAddedUser.next(response);
          },
          error : (e)=> {
            console.log(e)
            alert("Problem sa kreiranjem novog korisnika");
          }
  })

  }

}
