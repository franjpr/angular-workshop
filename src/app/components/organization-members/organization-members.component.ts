import {
  OnChanges,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MemberEntity } from "src/app/models/user.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-organization-members",
  templateUrl: "./organization-members.component.html",
  styleUrls: ["./organization-members.component.css"],
})
export class OrganizationMembersComponent implements OnInit, OnChanges {
  @Input() members: MemberEntity[] = [];
  @Output() viewProfileEmmiter: EventEmitter<MemberEntity> = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ["avatar_url", "login", "id"];
  dataSource: MatTableDataSource<MemberEntity>;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.members.currentValue.length) {
      this.dataSource = new MatTableDataSource(this.members);
      this.dataSource.paginator = this.paginator;
    }
  }

  viewProfile(user: MemberEntity): void {
    this.viewProfileEmmiter.emit(user);
  }
}
