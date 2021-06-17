/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KitapKiralamaComponent } from './KitapKiralama.component';

describe('KitapKiralamaComponent', () => {
  let component: KitapKiralamaComponent;
  let fixture: ComponentFixture<KitapKiralamaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitapKiralamaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitapKiralamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
