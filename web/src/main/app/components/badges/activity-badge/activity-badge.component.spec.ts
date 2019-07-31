import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBadgeComponent } from './activity-badge.component';

describe('ActivityBadgeComponent', () => {
  let component: ActivityBadgeComponent;
  let fixture: ComponentFixture<ActivityBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
