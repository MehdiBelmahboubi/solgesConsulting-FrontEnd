/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileUploadComponent,
            multi: true,
        },
    ],
    styleUrls: ['./file-upload.component.scss'],
    standalone: true,
    imports: [
      MatButtonModule,
      NgIf
    ],
})
export class FileUploadComponent implements ControlValueAccessor {
  onChange!: Function;
  public file: File | null = null;
  imageMin: File | null = null;
  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }
  @Output() fileSelected = new EventEmitter<File>();

  onFileSelected(event: any) {
    //this.reset();
    const file: File = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    fr.readAsDataURL(file);
    this.file = file;
    this.fileSelected.emit(file);
  }
  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    // add code here
  }
  reset(): void {
    this.file = null;
    this.imageMin = null;
    const imageInputFile = document.getElementById('image') as HTMLInputElement;
    if (imageInputFile) {
      imageInputFile.value = '';
    }
  }
}
