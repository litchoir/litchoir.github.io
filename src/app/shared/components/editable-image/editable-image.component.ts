import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { EditedImagePayload } from '../../interfaces/editable-image.interface';

@Component({
  selector: 'lc-editable-image',
  templateUrl: './editable-image.component.html',
  styleUrls: ['./editable-image.component.css']
})
export class EditableImageComponent implements OnInit {

  @Input() index: number = 0;
  @Input() displayWidth: number = 0;
  @Input() displayHeight: number = 0;
  @Input() aspectRatioWidth: number = 5;
  @Input() aspectRatioHeight: number = 2;
  @Input() enforceCompression : boolean = true;
  @Input() src: string = '';
  @Output() base64Computed = new EventEmitter<EditedImagePayload>();

  private maximumFileSizeBytes = 1000000;
  private allowedFileTypes = ['image/png', 'image/jpeg'];

  public base64: string = '';
  public imageIsDoneLoading: boolean = false;
  public imageError: string = "Wtf! Something's broken!"
  public editTextMessage: string = '';
  public editTextIcon: string = 'upload';

  public fileChange(fileInputEvent: any): void {
    
    if (fileInputEvent?.target?.files.length === 0) return;
    const uploadedFile = fileInputEvent.target.files[0];
    console.log(uploadedFile);
    
    /* Pre File Loaded Checks */
    if (this.enforceCompression && uploadedFile.size > this.maximumFileSizeBytes) {
      this.editTextMessage = `File could not be saved. Please make sure your image is less than 1MB in size.`;
      this.editTextIcon = 'exclamation-circle-fill';
      return;
    } else if (!this.allowedFileTypes.includes(uploadedFile.type)) {
      this.editTextMessage = `File could not be saved. Please make sure your image is of type JPG or PNG.`;
      this.editTextIcon = 'exclamation-circle-fill';
      return;
    }

    /* Post File Loader Checks */
    
    const imageReader = new FileReader();
    imageReader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        this.editTextMessage = `Lookin' good!`
        this.editTextIcon = 'check-circle-fill';
        this.base64 = e.target.result;
        this.base64Computed.emit({
          index: this.index,
          newContent: this.base64.slice(this.base64.indexOf(',') + 1)
        });
      }
    }
    imageReader.readAsDataURL(uploadedFile);
  }
 
  public removeImage() {
  }

  public showImage() {
    this.imageIsDoneLoading = true;
  }

  constructor() { }

  ngOnInit(): void {
    this.editTextMessage = 'Upload New';
  }

}
