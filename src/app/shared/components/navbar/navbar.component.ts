import { Component, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/services/my-translate/my-translate.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent {

  private readonly authService = inject(AuthService)
  private readonly translateService = inject(TranslateService)
  private readonly myTranslateService = inject(MyTranslateService)

  constructor(private flowbiteService: FlowbiteService) {
    this.translateService.setFallbackLang('ar');
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }


  logOut(){

    this.authService.logOut()

  }
  changeLanguage( lang: string ){
    this.myTranslateService.changeLanguage(lang);
  }

}
