import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarionListComponent } from './librarion-list.component';

describe('LibrarionListComponent', () => {
  let component: LibrarionListComponent;
  let fixture: ComponentFixture<LibrarionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrarionListComponent]
    });
    fixture = TestBed.createComponent(LibrarionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
