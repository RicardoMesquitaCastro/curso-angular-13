import { ListService } from './../../service/list.service';
import { Component } from '@angular/core';

import { Animal } from 'src/app/Animal';


@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.css']
})
export class ListRenderComponent {

  animals: Animal[] = [];

    // animal: Animal = {
    //   name: 'Teste',
    //   type: 'Alguma coisa',
    //   age: 10,
    // };

    animalDetails = ''

    constructor(private listService:ListService) {
      this.getAnimals()
    }    


  showAge(animal: Animal): void {
    this.animalDetails = `O pet ${animal.name} tem ${animal.age} anos!`;
  }

  removeAnimal(animal: Animal){
    this.animals = this.listService.remove(this.animals, animal);
  }
  
  getAnimals(): void {
    this.listService.getAll().subscribe((animals)=>(this.animals = animals));

  }

}
