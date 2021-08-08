import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnnoncesComponent } from './user-annonces.component';

describe('UserAnnoncesComponent', () => {
  let component: UserAnnoncesComponent;
  let fixture: ComponentFixture<UserAnnoncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAnnoncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
