import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from "./app.component";

import { MembersModule } from "./members/members.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { COMPONENTS } from "./components";
import { LoadingOverlayComponent } from "./components/loading-overlay/loading-overlay.component";
import { MaterialModule } from "./modules/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, ...COMPONENTS, LoadingOverlayComponent],
  imports: [
    BrowserModule,
    MembersModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
