import { Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'mycal-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  @Input() controlName!: string;
  @Input() messages: {[key:string]: string} = {};

  defaultMessages: {[key:string]: string} = {
    'required': 'This field is required'
  };

  displayedMessages: string[] = [];

  constructor(
    @Optional() private formGroupDirective: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formGroup.get(this.controlName)?.statusChanges.subscribe(() => this.updateMessages());
    this.formGroupDirective.ngSubmit.subscribe(() => {
      this.control.markAsDirty();
      this.updateMessages();
    });
    this.updateMessages();
  }

  get formGroup(): FormGroup {
    return this.formGroupDirective.form;
  }

  get control(): AbstractControl {
    const ctrl = this.formGroup.get(this.controlName);
    if (!ctrl) {
      throw 'control not found';
    } else {
      return ctrl;
    }
  }

  private updateMessages() {
    this.displayedMessages = [];

    if (this.control?.invalid && this.control.dirty) {
      for (const key in this.control.errors) {
        const message = this.messages[key] ||
          this.defaultMessages[key] ||
          key;
        
        this.displayedMessages.push(message)
      }
    }
  }
}
