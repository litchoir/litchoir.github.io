import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { merge, of, iif } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { SharedService } from '../../services/shared.service';
import { InputType, ValidationStatus } from './single-editable-section.interface';

@Component({
  selector: 'lc-single-editable-section',
  templateUrl: './single-editable-section.component.html',
  styleUrls: ['./single-editable-section.component.css']
})
export class SingleEditableSectionComponent {

  @Input() title: string = '';
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() topLevelKey: string = '';
  @Input() isSingleLine: boolean = true;
  @Output() textContentChanged: EventEmitter<any> = new EventEmitter();

  public isSaving: boolean = false;
  public validationStatus: ValidationStatus = { message: '', isError: false };

  private editedBase64: string = '';
  private valueJustSaved: string = '';

  @ViewChild('input') input!: any;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}

  setValidationStatus(message: string, isError: boolean, expiresAfter=0, andLogout=false) {
    this.isSaving = false;
    this.validationStatus = { message, isError};
    if (expiresAfter) setTimeout(() => { this.validationStatus = { message: '', isError: false}; }, expiresAfter);
    if (andLogout) setTimeout(() => { this.router.navigateByUrl('/login'); }, expiresAfter ? expiresAfter : 1500)
  }

  saveTextValue() {
    this.isSaving = true;
    const val = this.input.nativeElement.value;
    this.sharedService.putText({ key: this.topLevelKey, val }).pipe(
      tap(() => { this.valueJustSaved = val; })
    ).subscribe(
      this.completionCallback.bind(this),
      this.errorCallback.bind(this)
    );
  }

  saveImageValue() {
    this.isSaving = true;
    iif(
      () => !!this.editedBase64,
      merge(
        this.sharedService.deleteImage({ imageUrl: this.value }),
        this.sharedService.putImage({ content: this.editedBase64 }).pipe(
          map((responseData: any) => responseData.imageUrl),
          tap((imageUrl: any) => { this.valueJustSaved = imageUrl; }),
          concatMap((imageUrl: any) => this.sharedService.putText({ 
            key: this.topLevelKey, 
            val: imageUrl,
            mode: "UPDATE" 
          }))
        )
      ),
      of(true)
    ).subscribe(
      () => {},
      this.errorCallback.bind(this),
      this.completionCallback.bind(this)
    )
  }

  storeBase64(event: { newContent: string}) {
    this.editedBase64 = event.newContent;
  }

  completionCallback() {
    if (this.valueJustSaved) this.textContentChanged.emit({
      mode: 'UPDATE',
      key: this.topLevelKey,
      val: this.valueJustSaved /* if an image, need the value of the new text value or imageUrl */ 
    });

    this.valueJustSaved = '';
    this.isSaving = false;
    this.editedBase64 = '';
    this.setValidationStatus('Successfully saved!', false, 3000);
  }

  errorCallback(err: HttpErrorResponse) {
    if (err.status === 403) this.setValidationStatus(`You don't have permission. Redirecting to login screen`, true, 0, true);
    else this.setValidationStatus(`Something went wrong. Try again later`, true, 3000);
  }

  typeIsImage() { return this.type === InputType.Image }
  typeIsText() { return this.type === InputType.Text }
}