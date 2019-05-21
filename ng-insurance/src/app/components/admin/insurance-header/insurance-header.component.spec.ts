import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceHeaderComponent } from './insurance-header.component';

describe('InsuranceHeaderComponent', () => {
  let component: InsuranceHeaderComponent;
  let fixture: ComponentFixture<InsuranceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
