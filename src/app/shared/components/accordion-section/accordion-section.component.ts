import { Component, OnInit, Input, Output, ViewChild, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAccordion, NgbAccordionConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SaveState } from '../../constants/shared.constants';
import { EditedImagePayload, ImageNetworkPromiseResolution } from '../../interfaces/editable-image.interface';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'lc-accordion-section',
  templateUrl: './accordion-section.component.html',
  styleUrls: ['./accordion-section.component.css']
})
export class AccordionSectionComponent implements OnChanges {

  @ViewChild('acc') accordion!: NgbAccordion;
  @ViewChild('panelContentKey1') input1!: any;
  @ViewChild('panelContentKey2') input2!: any;
  @ViewChild('panelContentKey3') input3!: any;

  @Input() tooltipMessage: string = '';
  @Input() data: any;
  @Input() topLevelKey: string;
  @Input() images: number;
  @Input() isLoading: boolean = true;
  @Input() editingAccordionItem: string = '';
  @Input() panelHeaderKeys: string[];
  @Input() panelContentKeys: string[];
  @Output() textContentChanged: EventEmitter<any> = new EventEmitter();
  
  public saveState: SaveState = SaveState.Browsing;
  public SaveState: any = SaveState;
  private deleteModalRef: NgbModalRef;
  private editedImagesBase64: EditedImagePayload[] = [];
  private newItemCounter: number = 0;
  private blankImagePath = 'assets/blank-image.jpg';
  private changePayload: any = null;

  constructor(
    private sharedService: SharedService,
    private modalService: NgbModal, 
    private router: Router,
    private accordionConfig: NgbAccordionConfig
  ) { this.accordionConfig.closeOthers = true; }

  ngOnChanges(ch: SimpleChanges): void {
    if (ch.data?.previousValue && ch.data?.currentValue) {
      const previousValue = ch.data.previousValue;
      const currentValue = ch.data.currentValue;
      console.log(previousValue, currentValue);
      let newValue = currentValue.filter((cur: any) => cur.isNewItem && !(previousValue.find((prev: any) => prev.id === cur.id)));
      const id = newValue.length > 0 ? newValue[0].id : null;
      if (id) {
        this.saveState = SaveState.Editing;
        this.editingAccordionItem = this.accordionItemFrom(id);
        setTimeout(() => { 
          this.accordion.toggle(this.accordionItemFrom(id)); 
        }, 0)
      }
    }
  }

  shown() {}
  hidden() {       
    if (this.changePayload) this.textContentChanged.emit(this.changePayload);      
    this.saveState = SaveState.Browsing;
  }

  addNewButtonClicked() {
    const mockId = this.newItemCounter.toString();
    let blankObject: any = { 
      imageUrls: [
        "assets/blank-image.jpg",
        ... (this.images === 2 ? ["assets/blank-image.jpg"] : [])
      ],
      isNewItem: true
    };
    for (let hk of this.panelHeaderKeys) { blankObject[hk] = hk === 'date' ? Date.now() : ''; }
    for (let ck of this.panelContentKeys) { blankObject[ck] = ''; }
    this.textContentChanged.emit({
      key: this.topLevelKey,
      id: mockId,
      mode: "UPDATE",
      val: blankObject
    });
    this.newItemCounter++;
    this.saveState = SaveState.Editing;
    this.editingAccordionItem = this.accordionItemFrom(mockId);
  }

  editOrSaveButtonClicked(accordionItemId: string) {
    if (this.stateIsEditing()) {
      this.saveState = SaveState.Saving;
      this.saveAccordionItem(accordionItemId);
    } else {
      this.saveState = SaveState.Editing;
      this.editingAccordionItem = accordionItemId;
      this.accordion.toggle(accordionItemId);
    }
  }

  deleteButtonClicked(deleteModalContent: any) {
    this.deleteModalRef = this.modalService.open(deleteModalContent, { centered: true});
  }

  async deleteAccordionItem() {
    const previousUrls = this.getNewsItemPreviousImageUrls(this.editingAccordionItem);
    console.log(`previous urls: ${previousUrls}`);
    this.saveState = SaveState.Saving;
    this.deleteModalRef.close();
    await Promise.all(previousUrls.map(
      (_: string, idx: number) => this.deleteOldImageContent(this.editingAccordionItem, idx)
    ));
    this.saveTextContent(this.editingAccordionItem, null, 'DELETE');
  }

  imageEdited(event: EditedImagePayload) {
    this.editedImagesBase64 = this.editedImagesBase64.filter(
      (p: EditedImagePayload) => p.index !== event.index
    );
    this.editedImagesBase64.push(event);
  }

  isButtonDisabled(accordionItemId: string) {
    return !(
      this.stateIsBrowsing() || 
      (
        (
          this.stateIsUnsuccessfulOther() || 
          this.stateIsEditing()
        ) && 
        this.isEditingAccordionItem(accordionItemId)
      )
    )
  }

  isEditableNewsItem(accordionItemId: string) {
    return this.editingAccordionItem === '' || this.isEditingAccordionItem(accordionItemId); 
  }

  isEditingAnyNewsItem() {
    return this.editingAccordionItem === '';
  }

  isEditingAccordionItem(accordionItemId: string) {
    return this.editingAccordionItem === accordionItemId;
  }

  accordionItemFrom(id: string) {
    return 'accordion-item-' + id;
  }

  accordionItemToId(accordionItemId: string) {
    return accordionItemId.slice('accordion-item-'.length)
  }

  async deleteOldImageContent(accordionItemId: string, idx: number): Promise<ImageNetworkPromiseResolution> {
    const previousUrl = this.getNewsItemPreviousImageUrls(accordionItemId)[idx];
    return new Promise(resolve => {
      if (previousUrl === this.blankImagePath) return resolve({ index: idx });
      const payload = { imageUrl: previousUrl };
      this.sharedService.deleteImage(payload)
        .toPromise()
        .then(_ => resolve({ index: idx }))
        .catch(err => {
          if (err.status === 403) {
          this.saveState = SaveState.UnsuccessfullySavedForbidden;
          setTimeout(() => this.router.navigateByUrl('/login'), 1500);
          } else this.saveState = SaveState.UnsuccessfullySavedOther;
        });
    })
  }

   saveImageContent(idx: number, content: string): Promise<ImageNetworkPromiseResolution> {
    return new Promise(resolve => {
      const payload = { content }
      this.sharedService.putImage(payload)
        .toPromise()
        .then((data) => {
          this.editedImagesBase64 = [];
          resolve({ index: idx, imageUrl: data.imageUrl });
        })
        .catch((err) => {
          if (err.status === 403) {
            this.saveState = SaveState.UnsuccessfullySavedForbidden;
            setTimeout(() => this.router.navigateByUrl('/login'), 1500);
          } else this.saveState = SaveState.UnsuccessfullySavedOther;
        });
    })
  }

  async saveAccordionItem(accordionItemId: string) {
    const promisesToExecute = [];
    console.log(`inside saveAccordionItem: editedImagesBase64 = ${JSON.stringify(this.editedImagesBase64, null, 4)}`)
    for (let imageEdited of this.editedImagesBase64) { 
      promisesToExecute.push(this.deleteOldImageContent(accordionItemId, imageEdited.index))
      promisesToExecute.push(this.saveImageContent(imageEdited.index, imageEdited.newContent))
    }
    const networkResults = await Promise.all(promisesToExecute);
    const finalImages = this.getNewsItemPreviousImageUrls(accordionItemId);
    const newImages = networkResults.filter(result => result.imageUrl) /* get all the saveImageCalls */
    for (let i = 0; i < newImages.length; i++) {
      let finalImageIndex = newImages[i].index; 
      finalImages[finalImageIndex] = newImages[i].imageUrl; 
    }
    this.saveTextContent(accordionItemId, finalImages, 'UPDATE');
  }



  saveTextContent(accordionItemId: string, imageUrls: any, mode='UPDATE') {
    const isNewItem = this.data.find((a: any) => this.accordionItemToId(accordionItemId) === a.id).isNewItem;
    let payload: any = {
      key: this.topLevelKey,
      mode,
      ... !isNewItem && { id : this.accordionItemToId(accordionItemId) },
      ... (mode !== 'DELETE') && {
        val: {
          date: Date.now(),
          imageUrls
        }
      }
    };
    
    
    if (isNewItem && mode === 'DELETE') {
      this.changePayload = { ... payload, id: this.editingAccordionItem };         
      this.saveState = SaveState.SuccessfullySaved;
      this.editingAccordionItem = '';
      setTimeout(() => {
        this.editingAccordionItem = '';
        this.accordion.toggle(accordionItemId)
      }, 1500);
      return;
    };

    if (mode !== 'DELETE') {
      const inputValues = [this.input1, this.input2, this.input3];
      for (let i = 0; i < this.panelContentKeys.length; i++) { payload.val[this.panelContentKeys[i]] = inputValues[i].nativeElement.value; }
    }

    this.sharedService.putText(payload).subscribe(
      data => {
        if (data.success) {
          this.changePayload = { ... payload, id: data.id };  
          this.saveState = SaveState.SuccessfullySaved;
          this.editingAccordionItem = '';
          setTimeout(() => {
            this.editingAccordionItem = '';
            this.accordion.toggle(accordionItemId)
          }, 1500);
        }
      },
      error => {
        if (error.status === 403) {
          this.saveState = SaveState.UnsuccessfullySavedForbidden;
          setTimeout(() => this.router.navigateByUrl('/login'), 1500);
        } else { 
          this.saveState = SaveState.UnsuccessfullySavedOther;
          setTimeout(() => {
            this.editingAccordionItem = '';
            this.accordion.toggle(accordionItemId);
          }, 1000);
        }
      }
    );
  }

  getNewsItemPreviousImageUrls(accordionItemId: string) {
    return this.data.find((a: any) => this.accordionItemToId(accordionItemId) === a.id).imageUrls;
  }

  hasMultipleImages() {
    return this.images === 2;
  }

  stateIsBrowsing() {
    return this.saveState === SaveState.Browsing;
  }
  stateIsEditing() {
    return this.saveState === SaveState.Editing;
  }
  stateIsSaving() {
    return this.saveState === SaveState.Saving;
  }
  stateIsSuccessfullySaved() {
    return this.saveState === SaveState.SuccessfullySaved;
  }
  stateIsUnsuccessfulForbidden() {
    return this.saveState === SaveState.UnsuccessfullySavedForbidden;
  }
  stateIsUnsuccessfulOther() {
    return this.saveState === SaveState.UnsuccessfullySavedOther;
  }
}