import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeImageComponent } from './add-recipe-image.component';

describe('AddRecipeImageComponent', () => {
  let component: AddRecipeImageComponent;
  let fixture: ComponentFixture<AddRecipeImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecipeImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
