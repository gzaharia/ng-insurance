import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePriceComponent } from './base-price.component';

describe('BasePriceComponent', () => {
  let component: BasePriceComponent;
  let fixture: ComponentFixture<BasePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
