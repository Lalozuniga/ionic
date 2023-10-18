import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreadorDeRecetasPage } from './creador-de-recetas.page';

describe('CreadorDeRecetasPage', () => {
  let component: CreadorDeRecetasPage;
  let fixture: ComponentFixture<CreadorDeRecetasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreadorDeRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
