import { ListService } from './../../service/list.service';
import { Component, OnInit } from '@angular/core';

import { Animal } from 'src/app/Animal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.css']
})
export class ListRenderComponent  implements OnInit{

  animals: Animal[] = [];    
  animalDetails = ''
  isEdition = false

  public dados: FormGroup = this.formBuilder.group({
    id: [],
    name: ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z\s]*')])],
    type: ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z\s]*')])],
    age: [ , Validators.required]
  })

    constructor(private listService:ListService, private formBuilder: FormBuilder) {
    }    

    ngOnInit(): void {
      this.getAnimals()
    }

  showAge(animal: Animal): void {
    
    this.animalDetails = `O pet ${animal.name} tem ${animal.age} anos!`;
  }

  removeAnimal(animal: Animal){
    this.animals = this.animals.filter((a) => animal.name !== a.name);
    this.listService.remove(animal.id).subscribe();
  }
  
  getAnimals(): void {
    this.listService.getAll().subscribe((animals)=>(this.animals = animals));
  }

  

  onSubmit(){
    if(this.isEdition){
      this.listService.getPut(this.dados.value).subscribe({
        next: (value) => console.log(value)
      })
      this.dados.reset();
      this.getAnimals()
    }else{
    this.listService.getAdd(this.dados.value).subscribe({
      next: (value)=> console.log(value)
    })
    this.dados.reset();
    this.getAnimals()
    }
  }

  editar(animal : any){
    this.isEdition = true
    this.dados.patchValue({
      id: animal.id,
      name: animal.name,
      type: animal.type,
      age: animal.age
    })
  }

  console(){
    console.log(this.listService.getAll().subscribe((animals)=>(console.log(animals))))
  }

}
