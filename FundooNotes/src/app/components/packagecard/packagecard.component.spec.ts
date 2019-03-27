import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagecardComponent } from './packagecard.component';

describe('PackagecardComponent', () => {
  let component: PackagecardComponent;
  let fixture: ComponentFixture<PackagecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
