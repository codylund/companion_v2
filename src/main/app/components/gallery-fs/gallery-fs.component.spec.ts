import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryFsComponent } from './gallery-fs.component';

describe('GalleryFsComponent', () => {
  let component: GalleryFsComponent;
  let fixture: ComponentFixture<GalleryFsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryFsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
