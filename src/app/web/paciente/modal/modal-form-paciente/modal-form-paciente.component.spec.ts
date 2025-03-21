import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormPacienteComponent } from './modal-form-paciente.component';

describe('ModalFormPacienteComponent', () => {
  let component: ModalFormPacienteComponent;
  let fixture: ComponentFixture<ModalFormPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
