import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramHighlightComponent } from './instagram-highlight.component';

describe('InstagramHighlightComponent', () => {
  let component: InstagramHighlightComponent;
  let fixture: ComponentFixture<InstagramHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
