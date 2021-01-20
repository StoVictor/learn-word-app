import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsgameComponent } from './wsgame.component';

describe('WsgameComponent', () => {
  let component: WsgameComponent;
  let fixture: ComponentFixture<WsgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
