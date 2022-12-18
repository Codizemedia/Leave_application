import { Component, OnInit } from '@angular/core';
import { choicesA, choicesB } from '../../../../shared/form-questions';

@Component({
  selector: 'app-filled-form',
  templateUrl: './filled-form.component.html',
  styleUrls: ['./filled-form.component.scss']
})
export class FilledFormComponent implements OnInit {

  choices1 = choicesA;
  choices2 = choicesB;

  constructor() { }

  ngOnInit(): void {
  }

}
