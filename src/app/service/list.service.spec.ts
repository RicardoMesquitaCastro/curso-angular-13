import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListService } from './list.service';

class ListServiceMock extends ListService{
  response = [
    
      {
        "id": 3,
        "name": "Pandora",
        "type": "Dog",
        "age": 1
      },
      {
        "id": 4,
        "name": "Gamora",
        "type": "Dog",
        "age": 1
      },
      {
        "id": 5,
        "name": "Belinha",
        "type": "Horse",
        "age": 1
      },
    
  ];
 override getAnimal(){
    return of (this.response)
  }

}



describe('ListService', () => {
  let service: ListService;
  let httpTestingController: HttpTestingController;
  let url: any;
  let id: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
        providers:[
          {
          provide: ListService,
          useClass: ListServiceMock
          }
        ]
      
    
    });
    
    service = TestBed.inject(ListService);
    httpTestingController = TestBed.inject(HttpTestingController)
    url = 'http://localhost:3000'
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('Deve Adicionar novo adicionar um novo item', () => {
    const response = {
      id: null,
      name: 'Bulbassaur',
      type: 'planta',
      age: '2'
    }
    service.getAdd(response).subscribe(
      res => expect(res).toBe(response)
    )
    const request = httpTestingController.expectOne(`${url}/animals/`)
    expect(request.request.method).toBe('POST');
    request.flush(response)
    expect(request.request.url).toBe(`${url}/animals/`)
  })

  fit('Deve realizar chamada HTTP', ()=>{
      service.getAll().subscribe()
      const request = httpTestingController.expectOne(`${url}/animals`)
      request.flush({});
      expect(request.request.method).toBe('GET')
      expect(request.request.url).toBe(`${url}/animals`)
  })

//   it('Deve realizar chamada HTTP', ()=>{
    
// })

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

it('Deve atualizar animais PUT',() =>{
  //const id = 1;

  const resp = {
    id: 1,
    name: 'Bulbassaur',
    type: 'planta',
    age: '2'
  }
  const response =
  {
    id: 1,
    name: 'Bulbassaur',
    type: 'planta',
    age: '2'
  }
  service.getPut(response).subscribe(res => {
    expect(res).toBe(response)
  })

  const request = httpTestingController.expectOne(`${url}/animals/${resp.id}`)
  expect(request.request.method).toBe('PUT')
  expect(request.request.url).toBe(`${url}/animals/${resp.id}`)

  request.flush(response)

})
});