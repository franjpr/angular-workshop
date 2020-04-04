import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { ApiMemberEntity } from "./services/api-models/member-entity.model";
import { MembersApiService } from "./services/members-api.service";
import { Subscription, Subject } from "rxjs";
import { MemberEntity, createDefaultMemberEntityVm } from "./models/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  membersSubscription: Subscription;
  isLoading: boolean = true;
  title = "Angular Workshop";

  currentOrganization: string = "Lemoncode";
  currentMembers: MemberEntity[] = [];

  constructor(private ghService: MembersApiService) {}

  ngOnInit(): void {
    this.membersSubscription = this.ghService
      .getAllMembers(this.currentOrganization)
      .subscribe(this.getMembersSuccesHandler.bind(this));
  }

  async onSearchHandler(organizationName: string): Promise<void> {
    this.isLoading = true;
    const members: MemberEntity[] = await this.ghService
      .getAllMembers(organizationName)
      .toPromise();

    this.getMembersSuccesHandler(members);
  }

  getMembersSuccesHandler(members: MemberEntity[]): void {
    this.currentMembers = members;
    this.isLoading = false;
  }

  viewProfile(profileUrl: MemberEntity): void {
    console.log("AppComponent -> viewProfile -> profileUrl", profileUrl);
    // get data and display popUp
  }

  ngOnDestroy(): void {
    this.membersSubscription.unsubscribe();
  }
}
