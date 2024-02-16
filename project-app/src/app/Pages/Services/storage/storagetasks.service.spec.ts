import { TestBed } from '@angular/core/testing';
import { StoragetasksService } from './storagetasks.service';



describe('StoragetasksService', () => {
  let service:StoragetasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoragetasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
