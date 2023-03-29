import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRenderComponent } from './list-render.component';

import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ListRenderComponent', () => {
  let component: ListRenderComponent;
  let fixture: ComponentFixture<ListRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ListRenderComponent ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
