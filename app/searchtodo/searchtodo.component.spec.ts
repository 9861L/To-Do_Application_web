import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtodoComponent } from './searchtodo.component';

describe('SearchtodoComponent', () => {
  let component: SearchtodoComponent;
  let fixture: ComponentFixture<SearchtodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchtodoComponent]
    });
    fixture = TestBed.createComponent(SearchtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
