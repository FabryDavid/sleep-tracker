import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSleepPanelComponent } from './total-sleep-panel.component';

describe('TotalSleepPanelComponent', () => {
  let component: TotalSleepPanelComponent;
  let fixture: ComponentFixture<TotalSleepPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSleepPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSleepPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
