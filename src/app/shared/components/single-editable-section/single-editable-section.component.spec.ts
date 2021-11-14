import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEditableSectionComponent } from './single-editable-section.component';

describe('SingleEditableSectionComponent', () => {
  let component: SingleEditableSectionComponent;
  let fixture: ComponentFixture<SingleEditableSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleEditableSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEditableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
