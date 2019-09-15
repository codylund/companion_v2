import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceListControllerComponent } from './place-list-controller.component';

describe('ListControllerComponent', () => {
  let component: PlaceListControllerComponent;
  let fixture: ComponentFixture<PlaceListControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceListControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
