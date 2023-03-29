import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListService } from './list.service';



describe('ListService', () => {
  let service: ListService;
  let httpTestingController: HttpTestingController;
  let url: any;
  let id: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    
    service = TestBed.inject(ListService);
    httpTestingController = TestBed.inject(HttpTestingController)
    url = 'http://localhost:3000'
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada HTTP', ()=>{
      service.getAll().subscribe()
      const request = httpTestingController.expectOne(`${url}/animals`)
      request.flush({});
      expect(request.request.method).toBe('GET')
      expect(request.request.url).toBe(`${url}/animals`)
  })

  it('Deve realizar chamada HTTP com id', ()=>{
    service.getItem(id).subscribe()
    const request = httpTestingController.expectOne(`${url}/animals/${id}`)
    request.flush({});
    expect(request.request.method).toBe('GET')
    expect(request.request.url).toBe(`${url}/animals/${id}`)
})

it('Deve excluir animal', () =>{
  const id = 1;
  const response = {};
  service.remove(id).subscribe(res => {
    expect(res).toBe(response)
  })
  const request = httpTestingController.expectOne(`${url}/animals/${id}`)
    request.flush(response);
    expect(request.request.method).toBe('DELETE')
    expect(request.request.url).toBe(`${url}/animals/${id}`)
  
})
});
