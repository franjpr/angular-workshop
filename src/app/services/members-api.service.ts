import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { ApiMemberEntity } from "./api-models/member-entity.model";
import { map, catchError, delay } from "rxjs/operators";
import { mapToCollection } from "./mappers/collection.mapper";
import { MemberEntity } from "../models/user.model";
import { mapFromApiToVm } from "./mappers/member-entity.mapper";

@Injectable({
  providedIn: "root",
})
export class MembersApiService {
  private _currentOrganization: BehaviorSubject<string> = new BehaviorSubject<
    string
  >("");
  private _currentMembers: BehaviorSubject<
    MemberEntity[]
  > = new BehaviorSubject<MemberEntity[]>([]);

  currentOrganization$: Observable<
    string
  > = this._currentOrganization.asObservable();
  currentMembers$: Observable<
    MemberEntity[]
  > = this._currentMembers.asObservable();

  constructor(private http: HttpClient) {}

  getAllMembers(organizationName: string): Observable<MemberEntity[]> {
    const gitHubMembersUrl = `https://api.github.com/orgs/${organizationName}/members`;
    return this.http.get<ApiMemberEntity[]>(gitHubMembersUrl).pipe(
      //
      map<ApiMemberEntity[], MemberEntity[]>((response: ApiMemberEntity[]) =>
        mapToCollection<ApiMemberEntity, MemberEntity>(response, mapFromApiToVm)
      ),
      catchError(() => [])
    );
  }

  setCurrentOrganization(organizationName: string): void {
    this._currentOrganization.next(organizationName);
  }

  async loadMember() {
    const gitHubMembersUrl = `https://api.github.com/orgs/members`;
    const resp = await this.http
      .get<ApiMemberEntity[]>(gitHubMembersUrl)
      .pipe(
        //
        map<ApiMemberEntity[], MemberEntity[]>((response: ApiMemberEntity[]) =>
          mapToCollection<ApiMemberEntity, MemberEntity>(
            response,
            mapFromApiToVm
          )
        ),
        catchError(() => [])
      )
      .toPromise();

    this._currentMembers.next(resp);
  }
}
