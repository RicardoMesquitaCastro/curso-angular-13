import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChangeNumberComponent } from './change-number.component';

describe('ChangeNumberComponent', () => {
  let component: ChangeNumberComponent;
  let fixture: ComponentFixture<ChangeNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  fit('Deve emit mensagem quando clicar no botão', () => {
    const emitMessageSpy = spyOn(component.changeNumber, 'emit')

    let button = fixture.debugElement.query(By.css('button')).nativeElement
    button.click()

    expect(emitMessageSpy).toHaveBeenCalled()
  })


});
