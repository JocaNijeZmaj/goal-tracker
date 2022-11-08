import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBusinessComponent } from './member-business.component';

describe('MemberBusinessComponent', () => {
  let component: MemberBusinessComponent;
  let fixture: ComponentFixture<MemberBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
