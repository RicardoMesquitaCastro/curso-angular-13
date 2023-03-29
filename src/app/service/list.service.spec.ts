import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListService } from './list.service';

class ListServiceMock extends ListService{
  responseAll = [
    {
      "id": 1,
      "name": "Pandora",
      "type": "Filha de zeus",
      "age": 1
    },
    {
      "id": 2,
      "name": "Squitle",
      "type": "Água",
      "age": 1
    },
  ]
  override getAll() {
    return of(this.responseAll)
  }
  responsePut = {id: 1, name: 'Pandora', type: 'Filha de zeus', age: 1}

  responsePost =  {
    id: 4,
    name: 'teste',
    type: 'teste',
    age: 2
  }

  override getAdd(response: any){
    return of('teste')
  }

  override getPut(value : any) {
    return value;
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
          useClasse: ListServiceMock
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

  it('Deve realizar chamada HTTP getAll', ()=>{
    const  response = [
      {
        "id": 1,
        "name": "Pandora",
        "type": "Filha de zeus",
        "age": 1
      },
      {
        "id": 2,
        "name": "Squitle",
        "type": "Água",
        "age": 1
      },

    ]
      service.getAll().subscribe(res => {expect(res).toBe(response)})
      const request = httpTestingController.expectOne(`${url}/animals`)
      
      expect(request.request.method).toBe('GET')
      expect(request.request.url).toBe(`${url}/animals`)
  })

  it('Deve Adicionar novo adicionar um novo item getAdd', () => {
    const response = {
      id: null,
      name: 'Bulbassaur',
      type: 'planta',
      age: 2
    }
    
    service.getAdd(response).subscribe(
      res => expect(res).toBe(response)
    )
    const request = httpTestingController.expectOne(`${url}/animals/`)
    expect(request.request.method).toBe('POST');
   
    expect(request.request.url).toBe(`${url}/animals/`)
  })

  it('Deve Editar um item da lista getPut', () =>{
    const dados = {id: 1, name: 'Pandora', type: 'Filha de Zeus', age: 1}
    const response = {id: 1, name: 'Pandora', type: 'Filha de zeus', age: 1}
    service.getPut(dados).subscribe(res => expect(res).toBe(response))
    const request = httpTestingController.expectOne(`${url}/animals/${dados.id}`)
    request.flush(response)
    expect(request.request.method).toBe('PUT')
    expect(request.request.url).toBe(`${url}/animals/${dados.id}`)
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
