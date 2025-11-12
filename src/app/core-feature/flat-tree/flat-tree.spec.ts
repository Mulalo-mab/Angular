import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatTree } from './flat-tree';

describe('FlatTree', () => {
  let component: FlatTree;
  let fixture: ComponentFixture<FlatTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlatTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
