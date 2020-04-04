import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MemberEntity } from "src/app/models/user.model";

@Component({
  selector: "app-member-dialog",
  templateUrl: "./member-dialog.component.html",
  styleUrls: ["./member-dialog.component.css"],
})
export class MemberDialogComponent implements OnInit {
  user: MemberEntity;
  constructor(
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MemberEntity
  ) {}

  ngOnInit(): void {
    this.user = this.data;
  }

  close(): void {
    this.dialogRef.close();
  }
}
