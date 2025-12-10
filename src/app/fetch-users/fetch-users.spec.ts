import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchUsers } from './fetch-users';

describe('FetchUsers', () => {
  let component: FetchUsers;
  let fixture: ComponentFixture<FetchUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
