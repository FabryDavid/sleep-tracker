import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTimesTableComponent } from './sleep-times-table.component';

describe('SleepTimesTableComponent', () => {
  let component: SleepTimesTableComponent;
  let fixture: ComponentFixture<SleepTimesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SleepTimesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
