import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Angular Workshop";

  currentOrganization: string = "Lemoncode";

  constructor() {}

  onSearchHandler(organizationName: any) {
    console.log("event emmited", organizationName);
  }
}
