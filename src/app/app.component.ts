import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { ApiMemberEntity } from "./services/api-models/member-entity.model";
import { MembersApiService } from "./services/members-api.service";
import { Subscription, Subject } from "rxjs";
import { MemberEntity, createDefaultMemberEntityVm } from "./models/user.model";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { MemberDialogComponent } from "./components/member-dialog/member-dialog.component";

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

  constructor(
    private ghService: MembersApiService,
    private dialog: MatDialog
  ) {}

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

  async viewProfile(member: MemberEntity): Promise<void> {
    const user = await this.ghService.getMember(member.id).toPromise();
    this.dialog.open(MemberDialogComponent, {
      data: user,
    });
  }

  ngOnDestroy(): void {
    this.membersSubscription.unsubscribe();
  }
}
