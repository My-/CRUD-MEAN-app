import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeIngredientsComponent } from './add-recipe-ingredients.component';

describe('AddRecipeIngredientsComponent', () => {
  let component: AddRecipeIngredientsComponent;
  let fixture: ComponentFixture<AddRecipeIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecipeIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipeIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
