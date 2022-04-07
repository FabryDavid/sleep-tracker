import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTimePanelComponent } from './sleep-time-panel.component';

describe('SleepTimePanelComponent', () => {
  let component: SleepTimePanelComponent;
  let fixture: ComponentFixture<SleepTimePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SleepTimePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
