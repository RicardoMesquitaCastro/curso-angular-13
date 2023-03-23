import { Component } from '@angular/core';

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.css']
})
export class ListRenderComponent {
  animals = [
    {name: "Turca", type: "Dog" },
    {name: "Gamora", type: "Cat" },
    {name: "Pandora", type: "Dog" },
    {name: "Titica", type: "Horse" }
  ]

}
