import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTimesChartComponent } from './sleep-times-chart.component';

describe('SleepTimesChartComponent', () => {
  let component: SleepTimesChartComponent;
  let fixture: ComponentFixture<SleepTimesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SleepTimesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
