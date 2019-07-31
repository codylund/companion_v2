import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuggetListComponent } from './nugget-list.component';

describe('NuggetListComponent', () => {
  let component: NuggetListComponent;
  let fixture: ComponentFixture<NuggetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuggetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuggetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
