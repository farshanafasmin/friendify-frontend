import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFollowersComponent } from './view-followers.component';

describe('ViewFollowersComponent', () => {
  let component: ViewFollowersComponent;
  let fixture: ComponentFixture<ViewFollowersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFollowersComponent]
    });
    fixture = TestBed.createComponent(ViewFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
