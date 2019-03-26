import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageselectComponent } from './packageselect.component';

describe('PackageselectComponent', () => {
  let component: PackageselectComponent;
  let fixture: ComponentFixture<PackageselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
