import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-droit-legal',
  standalone: true,
  imports: [MatIcon,MatLabel,MatFormField,ReactiveFormsModule],
  templateUrl: './droit-legal.component.html',
  styleUrl: './droit-legal.component.scss'
})
export class DroitLegalComponent implements OnInit{
  droitLegalForm: any;
  constructor(private fb:FormBuilder){}
  ngOnInit() {
    this.droitLegalForm = this.fb.group({
      numberOfDays: [null, [Validators.required, Validators.min(1)]]
    });
  }

}
