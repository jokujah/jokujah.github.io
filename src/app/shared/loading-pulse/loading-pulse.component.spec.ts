import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPulseComponent } from './loading-pulse.component';

describe('LoadingPulseComponent', () => {
  let component: LoadingPulseComponent;
  let fixture: ComponentFixture<LoadingPulseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingPulseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
