import { DOCUMENT, NgClass } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfigService } from '@config';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { LanguageService, InConfiguration, AuthService } from '@core';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatMenuModule } from '@angular/material/menu';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatButtonModule } from '@angular/material/button';
import {LocalStorageService} from "../../services/storage/local-storage.service";

interface Notifications {
  message: string;
  time: string;
  icon: string;
  color: string;
  status: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    MatButtonModule,
    FeatherIconsComponent,
    MatMenuModule,
    NgScrollbar,
  ],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public config!: InConfiguration;
  userImg!: string;
  userFullName! : string;
  homePage?: string;
  isNavbarCollapsed = true;
  flagvalue: string | string[] | undefined;
  countryName: string | string[] = [];
  langStoreValue?: string;
  defaultFlag?: string;
  isOpenSidebar?: boolean;
  docElement?: HTMLElement;
  isFullScreen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    private localStorageService :LocalStorageService
  ) {
    super();
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    //{ text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    //{ text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Frensh', flag: 'assets/images/flags/fr.jpg', lang: 'fr' },

  ];
  notifications: any;
  ngOnInit() {
    this.userImg=this.localStorageService.getUser()?.urlImage || '';
    console.log("image user :",this.userImg)
    this.userFullName = this.localStorageService.getUser()?.firstName + ' ' + this.localStorageService.getUser()?.lastName;
    this.config = this.configService.configData;
    const userRole = this.authService.currentUserValue.role;
    this.userImg = this.authService.currentUserValue.img;
    this.docElement = document.documentElement;

    if (userRole === 'Admin') {
      this.homePage = 'admin/dashboard/main';
    } else if (userRole === 'Client') {
      this.homePage = 'client/dashboard';
    } else if (userRole === 'Employee') {
      this.homePage = 'employee/dashboard';
    } else {
      this.homePage = 'admin/dashboard/main';
    }

    this.langStoreValue = localStorage.getItem('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.jpg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
  }

  callFullscreen() {
    if (!this.isFullScreen) {
      if (this.docElement?.requestFullscreen != null) {
        this.docElement?.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'false');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'true');
    }
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }

  navigateSpace() {
    this.router.navigate([`/client/dashboard`])
  }
}
