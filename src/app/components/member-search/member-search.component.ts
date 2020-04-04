import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription, Observer } from "rxjs";

@Component({
  selector: "app-member-search",
  templateUrl: "./member-search.component.html",
  styleUrls: ["./member-search.component.css"],
})
export class MemberSearchComponent implements OnInit, OnDestroy {
  private formSubscription: Subscription;
  private formObserver: Observer<string>;
  @Input() currentOrganization: string = "";
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();

  inputForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.initFormObserver();
    this.initForm();
  }

  onSearch(): void {
    this.searchEmitter.emit(this.currentOrganization);
  }

  private initForm(): void {
    this.inputForm = new FormGroup({
      organizationControl: new FormControl(this.currentOrganization),
    });

    this.formSubscription = this.inputForm.controls.organizationControl.valueChanges.subscribe(
      this.formObserver
    );
  }

  private initFormObserver(): void {
    this.formObserver = {
      next: this.onInputChangeHandler.bind(this),
      error: console.warn,
      complete: () => {},
    };
  }

  private onInputChangeHandler(value: string): void {
    this.currentOrganization = value;
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
