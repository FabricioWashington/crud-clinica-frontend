import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormMedicoComponent } from './modal-form-medico.component';

describe('ModalFormMedicoComponent', () => {
  let component: ModalFormMedicoComponent;
  let fixture: ComponentFixture<ModalFormMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
