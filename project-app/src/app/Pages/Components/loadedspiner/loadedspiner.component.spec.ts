import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedspinerComponent } from './loadedspiner.component';

describe('LoadedspinerComponent', () => {
  let component: LoadedspinerComponent;
  let fixture: ComponentFixture<LoadedspinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadedspinerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadedspinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
