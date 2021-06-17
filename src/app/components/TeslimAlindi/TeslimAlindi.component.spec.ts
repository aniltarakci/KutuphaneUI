/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeslimAlindiComponent } from './TeslimAlindi.component';

describe('TeslimAlindiComponent', () => {
  let component: TeslimAlindiComponent;
  let fixture: ComponentFixture<TeslimAlindiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeslimAlindiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeslimAlindiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
