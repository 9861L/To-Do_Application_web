import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoByDateComponent } from './todo-by-date.component';

describe('TodoByDateComponent', () => {
  let component: TodoByDateComponent;
  let fixture: ComponentFixture<TodoByDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoByDateComponent]
    });
    fixture = TestBed.createComponent(TodoByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
