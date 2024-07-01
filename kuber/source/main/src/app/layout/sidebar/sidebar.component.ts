/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Router,
  NavigationEnd,
  RouterLinkActive,
  RouterLink,
} from '@angular/router';
import { DOCUMENT, NgClass } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
} from '@angular/core';
import {RoleEnv} from "./../../core/models/role";
import { AuthService } from '@core';
import { Role } from '../../models/role.model';
import { RouteInfo } from './sidebar.metadata';
import { TranslateModule } from '@ngx-translate/core';
import { FeatherModule } from 'angular-feather';
import { NgScrollbar } from 'ngx-scrollbar';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {LocalStorageService} from "../../services/storage/local-storage.service";
import {b} from "@fullcalendar/core/internal-common";
import {User} from "../../models/User.model";
import {ROUTES} from "./sidebar-items";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    NgScrollbar,
    RouterLinkActive,
    RouterLink,
    NgClass,
    FeatherModule,
    TranslateModule,
  ],
})
export class SidebarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public sidebarItems!: RouteInfo[];
  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  listMaxHeight?: string;
  listMaxWidth?: string;
  userFullName!: string;
  companyName!: string;
  userImg?: string;
  userType?: string;
  headerHeight = 60;
  currentUser! :User | null  ;
  urlImage! : string;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private localStorageService : LocalStorageService
  ) {
    super();
    this.elementRef.nativeElement.closest('body');
    this.subs.sink = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callToggleMenu(event: Event, length: number) {
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }

  ngOnInit() {
    let roles;
    this.currentUser=this.localStorageService.getUser();
    if (this.localStorageService.getUser()) {
      console.log("user connecter :",this.currentUser)
      console.log("roles : ",this.currentUser?.roles)
      const roles1 = this.currentUser?.roles.toString();
      console.log("roles1 !",roles1)
      const userRole = this.localStorageService.getUser()?.roles;
      console.log(userRole);
      this.urlImage=this.localStorageService.getUser()?.urlImage || '';
      this.userFullName = this.localStorageService.getUser()?.firstName + ' ' + this.localStorageService.getUser()?.lastName;
      this.companyName = this.localStorageService.getCurrentCompany()?.name || '';
      console.log("tostring ",roles1)
      const rolesArray = roles1?.split(',');
      console.log("Rôles séparés:", rolesArray?.includes("Aadmin"));
      const roleClient=rolesArray?.includes("Client");
      // ne le pref pas en considration
      const roleAdmin=rolesArray?.includes("AGdmin");
      const roleManager=rolesArray?.includes("Manager");

      if (roleAdmin){
        this.sidebarItems = ROUTES.filter(
          (x) => x.role.includes("admin")
        );
        console.log("route admin :", this.sidebarItems)
        this.userType = RoleEnv.Admin;
      }
      else if(roleClient){
        this.sidebarItems = ROUTES.filter(
          (x) => x.role.indexOf("manager") !== -1 || x.role.indexOf("client") !== -1 || x.role.indexOf('All') !== -1
        );
        console.log("route client :", this.sidebarItems)
        this.userType = RoleEnv.Client;
      }
      else if(roleManager){
        this.sidebarItems = ROUTES.filter(
          (x) => x.role.indexOf("manager") !== -1 || x.role.indexOf('All') !== -1
        );
        console.log("route manager :", this.sidebarItems)
        this.userType = RoleEnv.Manager;
      }
    }
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }
  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1025) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}
function rolePresent(listRole:Role[],role:string):boolean{
  return listRole.some((str: Role) => str.name.toLowerCase() === role.toLowerCase());
}
