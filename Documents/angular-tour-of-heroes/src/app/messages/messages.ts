import { Component } from '@angular/core';
import { MessageService } from '../message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.html',
  styleUrls: ['./messages.css']
})
export class MessagesComponent {
  constructor(public messageService: MessageService) { }
}
