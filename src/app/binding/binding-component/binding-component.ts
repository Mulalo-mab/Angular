import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding-component',
  standalone: false,
  templateUrl: './binding-component.html',
  styleUrl: './binding-component.css'
})
export class BindingComponent implements OnInit {

  public name = "Mulalo";
  public greeting = "";
  public surname = "";
  constructor() { }

  ngOnInit() {

  }

  onClick() {
    console.log('Welcome to codevolution');
    this.greeting = 'Welcome to codevolution';
  }
}
