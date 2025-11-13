import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedTree } from './nested-tree';

describe('NestedTree', () => {
  let component: NestedTree;
  let fixture: ComponentFixture<NestedTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NestedTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
