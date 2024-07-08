import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-add-collaborater',
  standalone: true,
  imports: [MatDatepickerModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule ],
  templateUrl: './add-collaborater.component.html',
  styleUrl: './add-collaborater.component.scss'
})
export class AddCollaboraterComponent {

}
