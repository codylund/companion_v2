import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBuilderComponentComponent } from './blog-builder-component.component';

describe('BlogBuilderComponentComponent', () => {
  let component: BlogBuilderComponentComponent;
  let fixture: ComponentFixture<BlogBuilderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogBuilderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogBuilderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
