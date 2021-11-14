import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeHeaderComponent } from './large-header.component';

describe('LargeHeaderComponent', () => {
  let component: LargeHeaderComponent;
  let fixture: ComponentFixture<LargeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
