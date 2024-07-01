import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupcredComponent } from './popupcred.component';

describe('PopupcredComponent', () => {
  let component: PopupcredComponent;
  let fixture: ComponentFixture<PopupcredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupcredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupcredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
