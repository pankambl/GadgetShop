import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDialogBox } from './customers-dialog-box';

describe('CustomersDialogBox', () => {
  let component: CustomersDialogBox;
  let fixture: ComponentFixture<CustomersDialogBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDialogBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersDialogBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
