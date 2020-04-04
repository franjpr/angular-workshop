import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, of } from "rxjs";
import { ApiMemberEntity } from "./api-models/member-entity.model";
import { map, catchError, delay } from "rxjs/operators";
import { mapToCollection } from "./mappers/collection.mapper";
import {
  MemberEntity,
  createDefaultMemberEntityVm,
} from "../models/user.model";
import { mapFromApiToVm } from "./mappers/member-entity.mapper";

@Injectable({
  providedIn: "root",
})
export class MembersApiService {
  constructor(private http: HttpClient) {}

  getAllMembers(organizationName: string): Observable<MemberEntity[]> {
    const gitHubMembersUrl = `https://api.github.com/orgs/${organizationName}/members`;
    return this.http.get<ApiMemberEntity[]>(gitHubMembersUrl).pipe(
      //
      map<ApiMemberEntity[], MemberEntity[]>((response: ApiMemberEntity[]) =>
        mapToCollection<ApiMemberEntity, MemberEntity>(response, mapFromApiToVm)
      ),
      catchError(() => of([]))
    );
  }

  getMember(userId: number): Observable<MemberEntity> {
    const memberUrl = `https://api.github.com/user/${userId}`;
    return this.http.get(memberUrl).pipe(
      //
      map<ApiMemberEntity, MemberEntity>(mapFromApiToVm),
      catchError(() => of(createDefaultMemberEntityVm()))
    );
  }
}
