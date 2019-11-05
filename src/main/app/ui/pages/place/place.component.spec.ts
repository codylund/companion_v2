import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceComponent } from './place.component';
import { PlaceService } from '../../../core/service/place.service';
import { Place } from 'src/main/shared/model';
import { MetadataComponent } from '../../components/metadata/metadata.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GalleryComponent } from '../../components/media/gallery/gallery.component';
import { of } from 'rxjs';


var mockPlace = new Place({
  metadata: {
    id: "testId",
    title: "testTitle",
    date: new Date("01/01/2020"),
    location: {
      city: "city",
      state: "state",
      country: "country",
      url: "locationUrl"
    },
    tags: [
      "tag1",
      "tag2",
      "tag3"
    ]
  },
  content: {
    body: "body",
    synopsis: "synopsis",
    photos: [
      {
        url: "photoUrl1.jpg",
      },
      {
        url: "photoUrl2.jpg",
      },
      {
        url: "photoUrl3.jpg",
      }
    ]
  }
});

class MockPlaceService {
  getPlace(id: string) {
    return of(mockPlace);
  }
}

describe('PlaceComponent', () => {
  let component: PlaceComponent;
  let fixture: ComponentFixture<PlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GalleryComponent,
        PlaceComponent,
        MetadataComponent
      ],
      providers: [
        PlaceComponent,
        { provide: PlaceService, useClass: MockPlaceService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a <h1> title', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    const h1 = element.querySelector("h1");

    expect(h1.textContent).toEqual(mockPlace.metadata.title);
  });

  it('should have a <h2> location w/ link', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    const h2 = element.querySelector("h2");
    const a = h2.querySelector("a");

    var location = mockPlace.metadata.location;
    expect(a.textContent).toContain(`${location.city}, ${location.state}, ${location.country}`);
    expect(a.getAttribute("href")).toEqual(location.url);
  });

  it('should have a <h3> date', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    const h3 = element.querySelector("h3");

    var date = mockPlace.metadata.date.toLocaleDateString("en-us", {
      month: 'long', day: 'numeric', year: 'numeric'
    });
    expect(h3.textContent).toContain(date);
  });

  it('should have a synopsis', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement ;
    const synopsis = element.getElementsByClassName('synopsis').item(0);

    expect(synopsis.textContent).toContain(mockPlace.content.synopsis);
  })

  it('should have all the images', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement ;
    const images = element.querySelectorAll('img');

    images.forEach((img, idx) => {
      expect(img.getAttribute('src')).toEqual(mockPlace.content.photos[idx].url);
    });
  })
});
