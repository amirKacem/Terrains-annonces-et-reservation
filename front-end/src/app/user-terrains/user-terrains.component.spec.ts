import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTerrainsComponent } from './user-terrains.component';

describe('UserTerrainsComponent', () => {
  let component: UserTerrainsComponent;
  let fixture: ComponentFixture<UserTerrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTerrainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTerrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
