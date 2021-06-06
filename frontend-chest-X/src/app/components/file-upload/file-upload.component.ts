import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  // @ViewChild('reset') reset!:ElementRef;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfo?: Observable<any>;
  // resetValue: any;
  resetBtn = false;
  form!: FormGroup;
  pickedImage: string | undefined;

  constructor(private fileUploadService: BackendApiService) { }

  ngOnInit(): void {
    this.fileInfo = this.fileUploadService.getFiles();
    console.log(this.fileInfo)

    this.form = new FormGroup({
      image: new FormControl(null, {validators:[Validators.required]})
    })
  }

  selectFile(event: any): void{
    const file = event.target.files[0];
      this.selectedFiles = event.target.files;
      this.form.patchValue({image: file});
      this.form.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = ()=>{
        this.pickedImage = reader.result as string;
      };
      reader.readAsDataURL(file);

    }
  inputReset(reset: any): void{
      this.currentFile = undefined;
      this.selectedFiles = undefined;
      this.resetBtn = false;
      reset.value = '';
      this.message = '';
      this.pickedImage = '';

  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      console.log(file)
      if (file){
        this.currentFile = file;
        this.resetBtn = true;
        this.fileUploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress){
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            else if (event instanceof HttpResponse){
              this.message = event.body.message;
              this.fileInfo = this.fileUploadService.getFiles();
            }
          },
          (error: any) => {
            console.log(error);
            this.progress = 0;
            if (error.error && error.error.message){
              this.message = error.error.message;
            }
            else{
              this.message = 'File cannot be uploaded!';
              this.resetBtn = true;
            }
            this.currentFile = undefined;
          }
        );
      }
      this.selectedFiles = undefined;
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void{
    // this.resetValue = this.reset.nativeElement.value;
    // console.log(this.reset.nativeElement.value);
  }

}