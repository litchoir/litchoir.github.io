import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { LargeHeaderComponent } from './components/large-header/large-header.component';
import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';
import { LinkWithIconComponent } from './components/link-with-icon/link-with-icon.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SharedGuard } from './guards/shared.guard';
import { SharedService } from './services/shared.service';
import { SectionComponent } from './components/section/section.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { EditableImageComponent } from './components/editable-image/editable-image.component';
import { NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionSectionComponent } from './components/accordion-section/accordion-section.component';
import { CamelCaseToTitleCasePipe } from './pipes/camel-case-to-title-case.pipe';
import { SingleEditableSectionComponent } from './components/single-editable-section/single-editable-section.component';

@NgModule({
  declarations: [ 
    CardComponent, 
    LargeHeaderComponent, 
    AlertComponent, 
    ButtonComponent,
    LinkWithIconComponent,
    SpinnerComponent,
    SectionComponent,
    TabsComponent,
    EditableImageComponent,
    AccordionSectionComponent,
    CamelCaseToTitleCasePipe,
    SingleEditableSectionComponent
  ],
  imports: [ 
    CommonModule,
    NgbAccordionModule,
    NgbTooltipModule
  ],
  exports: [ 
    AccordionSectionComponent,
    CardComponent,
    LargeHeaderComponent,
    EditableImageComponent,
    AlertComponent,
    ButtonComponent,
    LinkWithIconComponent,
    SectionComponent,
    SingleEditableSectionComponent,
    SpinnerComponent,
    TabsComponent
  ],
  providers: [
    SharedGuard,
    SharedService
  ]
})
export class SharedModule { }
