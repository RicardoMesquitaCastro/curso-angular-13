import { Component } from '@angular/core';

import { Animal } from 'src/app/Animal';

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.css']
})
export class ListRenderComponent {
  animals: Animal[] = [
    {name: "Turca", type: "Dog", age: 1 },
    {name: "Gamora", type: "Cat", age: 4 },
    {name: "Pandora", type: "Dog", age: 9 },
    {name: "Titica", type: "Horse", age:5 }
  ];

    animal: Animal = {
      name: 'Teste',
      type: 'Alguma coisa',
      age: 10,
    };

    animalDetails = ''




  showAge(animal: Animal): void {
    this.animalDetails = `O pet ${animal.name} tem ${animal.age} anos!`;
  }
  

}
