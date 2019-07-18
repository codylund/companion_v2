import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuggetComponent } from './nugget.component';

describe('NuggetComponent', () => {
  let component: NuggetComponent;
  let fixture: ComponentFixture<NuggetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuggetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuggetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
