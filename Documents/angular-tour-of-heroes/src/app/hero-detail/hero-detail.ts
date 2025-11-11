import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.html',
  styleUrls: ['./hero-detail.css'] 
})
export class HeroDetail {
  @Input() hero?: Hero;
}
