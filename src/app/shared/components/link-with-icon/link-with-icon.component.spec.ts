import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkWithIconComponent } from './link-with-icon.component';

describe('LinkWithIconComponent', () => {
  let component: LinkWithIconComponent;
  let fixture: ComponentFixture<LinkWithIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkWithIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
