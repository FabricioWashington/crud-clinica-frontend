import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormAgendamentoComponent } from './modal-form-agendamento.component';

describe('ModalFormAgendamentoComponent', () => {
  let component: ModalFormAgendamentoComponent;
  let fixture: ComponentFixture<ModalFormAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormAgendamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
