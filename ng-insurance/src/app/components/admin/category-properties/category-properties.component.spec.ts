import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPropertiesComponent } from './category-properties.component';

describe('CategoryPropertiesComponent', () => {
  let component: CategoryPropertiesComponent;
  let fixture: ComponentFixture<CategoryPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
