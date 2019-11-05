import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBuilderComponent } from './blog-builder.component';

describe('BlogBuilderComponent', () => {
  let component: BlogBuilderComponent;
  let fixture: ComponentFixture<BlogBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
