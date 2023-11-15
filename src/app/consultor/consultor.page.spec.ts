import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultorPage } from './consultor.page';

describe('ConsultorPage', () => {
  let component: ConsultorPage;
  let fixture: ComponentFixture<ConsultorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConsultorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
