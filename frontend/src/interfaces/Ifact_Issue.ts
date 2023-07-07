import { StatusInterface } from "./Idim_Status";
import { ProjectInterface } from "./Idim_Project";
import { ImportanceInterface } from "./Idim_Importance";
import { UsersInterface } from "./Idim_User";

export interface IssueInterface {
    ID?: number,
    IssueTimeCreate: Date,
    IssueTimeUpdate?: Date | null,
    IssueTimeComplete?: Date | null,
    StatusID?: number ,
    Status?: StatusInterface ,
    ProjectID?: number ,
    Project?: ProjectInterface ,
    ImportanceID?: number ,
    Importance?: ImportanceInterface ,
    UserID?: number,
	User?: UsersInterface ,
    AdminID?: number,
	Admin?: UsersInterface ,

    Solution?: string ,
	Detail?: string,
	QVpic?: string,
	PowerBIpic?: string,
    Note?: string,
}