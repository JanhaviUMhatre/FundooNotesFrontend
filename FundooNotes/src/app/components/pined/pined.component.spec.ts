import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinedComponent } from './pined.component';

describe('PinedComponent', () => {
  let component: PinedComponent;
  let fixture: ComponentFixture<PinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
