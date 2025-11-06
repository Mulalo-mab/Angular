import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedStyle } from './combined-style';

describe('CombinedStyle', () => {
  let component: CombinedStyle;
  let fixture: ComponentFixture<CombinedStyle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CombinedStyle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedStyle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
