import {Component, Input} from '@angular/core';
import {FeatherIconsComponent} from "@shared/components/feather-icons/feather-icons.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header-sirh-client',
  standalone: true,
  imports: [
    FeatherIconsComponent,
    RouterLink
  ],
  templateUrl: './header-sirh-client.component.html',
  styleUrl: './header-sirh-client.component.scss'
})
export class HeaderSirhClientComponent {
  @Input()
  title!: string;
  @Input()
  items!: string[];
  @Input()
  active_item!: string;

  constructor() {
    //constructor
  }
}
