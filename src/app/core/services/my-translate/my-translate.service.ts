import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {

  private readonly translateService = inject(TranslateService)
  private readonly platFormId = inject(PLATFORM_ID)

  constructor() { 
    if(isPlatformBrowser(this.platFormId)){
          // get the current language from local storage or default to 'en'
    let savedLang = localStorage.getItem('lang') 

    // use saved language

  if(savedLang){
    this.translateService.use(savedLang)
  }
  // set default language
  else{
    this.translateService.setFallbackLang('en')
  }
    }

    this.changeDirection();
  }

  changeDirection(){
    if(isPlatformBrowser(this.platFormId)){
      if( localStorage.getItem('lang')=='en'){
        document.documentElement.setAttribute('dir', 'ltr')
        document.documentElement.setAttribute('lang', 'en')
      }
      else if(localStorage.getItem('lang')=='ar'){
        document.documentElement.setAttribute('dir', 'rtl')
        document.documentElement.setAttribute('lang', 'ar')
  
      }
    }
  }

  changeLanguage( lang: string  ){
    if(isPlatformBrowser(this.platFormId)){
      localStorage.setItem('lang', lang)
      this.translateService.use(lang)
      this.changeDirection()
    }
  }
  
}
