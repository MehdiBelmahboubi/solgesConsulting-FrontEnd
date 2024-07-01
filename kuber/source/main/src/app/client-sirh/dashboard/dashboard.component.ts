import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import {FeatherIconsComponent} from "@shared/components/feather-icons/feather-icons.component";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgClass} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgScrollbar} from "ngx-scrollbar";
import {RouterLink} from "@angular/router";
import {MatProgressBar} from "@angular/material/progress-bar";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BreadcrumbComponent, FeatherIconsComponent, MatButton, MatMenu, MatMenuItem, NgClass, MatMenuTrigger, MatFormField, MatInput, MatMiniFabButton, NgScrollbar, RouterLink, MatProgressBar],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  clientRouterLink= '/client/gestionnaires/gestionnaires_1';
  newStructureRouterLink = '/client/dashboard';

}
