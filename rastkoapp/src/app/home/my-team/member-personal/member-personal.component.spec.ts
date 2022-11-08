import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPersonalComponent } from './member-personal.component';

describe('MemberPersonalComponent', () => {
  let component: MemberPersonalComponent;
  let fixture: ComponentFixture<MemberPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
