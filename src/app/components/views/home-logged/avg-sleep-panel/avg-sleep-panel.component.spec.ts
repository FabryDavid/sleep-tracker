import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgSleepPanelComponent } from './avg-sleep-panel.component';

describe('AvgSleepPanelComponent', () => {
  let component: AvgSleepPanelComponent;
  let fixture: ComponentFixture<AvgSleepPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgSleepPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgSleepPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
