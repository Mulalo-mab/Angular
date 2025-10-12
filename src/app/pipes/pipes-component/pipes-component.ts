import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes-component',
  standalone: false,
  templateUrl: './pipes-component.html',
  styleUrl: './pipes-component.css'
})
export class PipesComponent implements OnInit {

  public name = "codevolution";
  public message = "welcome to my code";
  public date = new Date();
  constructor() { }

  ngOnInit() {

  }
}
