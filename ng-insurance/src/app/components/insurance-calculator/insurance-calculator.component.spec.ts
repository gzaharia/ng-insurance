import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCalculatorComponent } from './insurance-calculator.component';

describe('InsuranceCalculatorComponent', () => {
  let component: InsuranceCalculatorComponent;
  let fixture: ComponentFixture<InsuranceCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
