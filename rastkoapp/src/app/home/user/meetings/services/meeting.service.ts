import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { getTopics, Goal, Meeting, MeetStatus, NewMeet, UpdateMeet, UpdateNote, UpdateNotes, updateTopic } from 'src/app/entities';
import { environment } from 'src/environments/environment';

@Injectable()
export class MeetingService {

  updateNote! : UpdateNote;
  meetingCreated = new Subject<boolean>();
  topicAdded = new Subject<getTopics>();
  updatedMeet = new Subject<UpdateMeet>();

  constructor(private http : HttpClient) {

  }

  private path = environment.apiGate;
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getMeetings(status : MeetStatus){
    console.log(this.path);
    return this.http.get<Meeting[]>(`${this.path}meeting?status=${status}`);
  }

  createMeet(newMeet: NewMeet){
    return this.http.post<NewMeet>(this.path + 'meeting', newMeet);
  }
  updateMeet(meet : UpdateMeet){
    this.http.put<UpdateMeet>(this.path + "meeting", meet).subscribe({
      next: (response : UpdateMeet) => {
        console.log(response);
        this.updatedMeet.next(response);
      },
      error: error => {
          console.error('There was an error!', error);
      }
    })
  }

  updateNotes(updateNote : UpdateNote){
    console.log(updateNote);
    return this.http.put<UpdateNotes>(this.path + `meeting/note`, updateNote);
  }
  addTopics(newTopic: updateTopic){
    return this.http.post<getTopics>(this.path + 'meeting/topic', newTopic);
  }
  deleteTopic(id: string){
    const url = `${this.path + "meeting/topic"}/${id}`
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }
  deleteMeet(id: string){
    const url = `${this.path + "meeting"}/${id}`
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }
}
