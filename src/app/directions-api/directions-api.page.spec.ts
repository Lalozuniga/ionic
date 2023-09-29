import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectionsApiPage } from './directions-api.page';

describe('DirectionsApiPage', () => {
  let component: DirectionsApiPage;
  let fixture: ComponentFixture<DirectionsApiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DirectionsApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
