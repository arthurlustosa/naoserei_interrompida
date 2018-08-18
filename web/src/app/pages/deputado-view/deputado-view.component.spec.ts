import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputadoViewComponent } from './deputado-view.component';

describe('DeputadoViewComponent', () => {
  let component: DeputadoViewComponent;
  let fixture: ComponentFixture<DeputadoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputadoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputadoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
