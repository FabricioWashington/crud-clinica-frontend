import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormEspecialidadeComponent } from './modal-form-especialidade.component';

describe('ModalFormEspecialidadeComponent', () => {
  let component: ModalFormEspecialidadeComponent;
  let fixture: ComponentFixture<ModalFormEspecialidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormEspecialidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormEspecialidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
