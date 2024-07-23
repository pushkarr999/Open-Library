import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteLibrarianModalComponent } from './invite-librarian-modal.component';

describe('InviteLibrarianModalComponent', () => {
  let component: InviteLibrarianModalComponent;
  let fixture: ComponentFixture<InviteLibrarianModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteLibrarianModalComponent]
    });
    fixture = TestBed.createComponent(InviteLibrarianModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
