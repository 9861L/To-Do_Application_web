import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletedTodoComponent } from './view-completed-todo.component';

describe('ViewCompletedTodoComponent', () => {
  let component: ViewCompletedTodoComponent;
  let fixture: ComponentFixture<ViewCompletedTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCompletedTodoComponent]
    });
    fixture = TestBed.createComponent(ViewCompletedTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
