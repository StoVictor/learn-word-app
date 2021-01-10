import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAndGameComponent } from './training-and-game.component';

describe('TrainingAndGameComponent', () => {
  let component: TrainingAndGameComponent;
  let fixture: ComponentFixture<TrainingAndGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAndGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAndGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
