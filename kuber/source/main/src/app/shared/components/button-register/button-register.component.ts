import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {StylesService} from "../../../services/stylesService";

@Component({
  selector: 'app-button-register',
  standalone: true,
    imports: [
        MatButton,
        NgIf
    ],
  templateUrl: './button-register.component.html',
  styleUrl: './button-register.component.scss'
})
export class ButtonRegisterComponent {
  @Input() backgroundColor='';
  @Input() title ='';
  @Output() public emitter=new EventEmitter();
  @Input() valid: boolean=false;
   constructor() {

   }

  emitEvent() {
    this.emitter.emit();
  }
}
