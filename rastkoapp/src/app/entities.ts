//ENUMS

import { Title } from "@angular/platform-browser";

export enum Roles{
    Admin = "ADMIN",
    Employee = "EMPLOYEE",
    Manager = "MANAGER",
}
export enum GoalType{
    Business = "BUSINESS",
    Personal = "PERSONAL"
}
export enum GoalStatus{
    Active = "ACTIVE",
    Pending = "PENDING",
    Completed = "COMPLETED"
}

//USER
export interface User{
    email: string,
    firstName: string,
    lastName: string,
    role: Roles,
    manager: User | null,
    birthday: Date,
    picture: string,
    pictureUrl? : string,
    creationDate?: string,
    position?: string
}
export interface UpdateUser {
    id: string,
    firstName: string,
    lastName: string,
    myPosition?: string,
    birthday?: string
}

export interface NewUser{
    email : string ;
    managerEmail : string ;
}

export interface CompanyUser {
    email: string,
    firstName: string,
    lastName: string,
    role: Roles,
    manager: User | null,
    birthday: Date,
    picture: string,
    pictureUrl? : string,
    creationDate?: string
}

//GOALS
export interface NewGoal{
    name: string,
	description: string,
	email: string,
	due_date: string,
	type: GoalType,
    subtasks: NewTask[]

}
export interface EditGoal{
    id: string,
	description: string,
    subtasks: Task[],
    final_report? : FinalReport[]
    //If subtask.id is empty string new subtask is created,
    //otherwise subtask is updated (already exists in db).
}

export interface Goal{

    id: string,
    name: string,
    description: string,
    email: string,
    is_approved: boolean,
    creation_date: Date,
    due_date: Date,
    subtasks: Task[],
    tasks? : SubTask[],
    employeeEmail?: string,
    employee_email?: string,
    final_report? : FinalReport[]
}
export interface Task{
    id : string,
    name: string,
    done: boolean
}

export interface SubTask{
    id : string,
    title : string
}

export interface NewTask{
    name : string,
    done : boolean
}
export interface FinalReport{

    goal_id: string,
    manager_email: string,
    text: string,
    grade: number,
    id: string,
    created_at: Date,
    modified_at: Date

}

export interface PostFinalReport {
    goal_id: string,
    manager_email: string,
    text: string,
    grade: number
}

//MEETINGS
export interface NewMeet{
  title: string,
	link: string,
	date: string, //neeeds this format "2022-08-12"
	employeeEmail: string,
	topics: string[],
  time?: string //hh:mm:ss
}

export interface ActiveMeet{
    title: string,
	link: string,
	date: Date, //neeeds this format "2022-08-12"
	employeeEmail: string,
	topics: string[],
    time: string
}

export interface OldMeet{
    title: string,
	link: string,
	date: string, //neeeds this format "2022-08-12"
	note : string;
    time : string,
}

export interface Meeting{
    id : string,
    date : Date,
    title : string,
    link: string,
    managerEmail : string,
    employeeEmail : string,
    managerNotes: string,
    employeeNotes: string,
    topics: Topic[],
    time?: string

}
export interface UpdateMeet {
        id: string,
        title: string,
        link: string,
        date: Date,
        topics?: string[]
}
export interface UpdateNotes {
    id: string,
    date: Date,
    title: string,
    link: string,
    managerEmail: string,
    employeeEmail: string,
    topics: [],
    managerNotes: string,
    employeeNotes: string,
    creationDate: Date,
    lastModifiedDate: Date
}
export interface UpdateNote {
    meetingId : string, // form of uuid
    noteUpdate : string // new value to be stored
    }

export interface Topic {
    id: string;
    topicTitle : string;
    topicOwner?:  string;

}

export enum MeetStatus{
    Active = 'active',
    Finished='finished'
}
export interface updateTopic {
    meetingId: string,
    topicTitle: string
}
export interface getTopics {
    id: string,
    topicTitle: string,
    topicOwner: string,
    creationDate: Date,
    lastModifiedDate: null | Date
}
