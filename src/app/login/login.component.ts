import { Component } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { LC_COOKIE_KEY_NAME, MS_IN_AN_HOUR } from './login.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router, 
    private sharedService: SharedService,
    private cookieService: CookieService
  ) {}
  password: string = '';
  isLoading = false;
  currentAlert = 'default';
  alertData : any = {
    'default': {
      emoji: '👋',
      type: 'secondary',
      boldText: 'Hi There!',
      regularText: 'Welcome to the Notre Dame Liturgical Choir admin page. Webmasters should log in below. If you arrived here by mistake, please visit the <a href="https://litchoir.nd.edu">normal website</a>.'
    },
    'success': {
      emoji: '😎',
      type: 'success',
      boldText: 'Success!',
      regularText: 'You have been successfully logged in. You will be redirected to the website admin page shortly.'
    },
    'forbidden': {
      emoji: '🔒',
      type: 'danger',
      boldText: 'Uh Oh!',
      regularText: 'The password you provided is invalid. Please try another, or check your capitalization and spelling.'
    },
    'otherError': {
      emoji: '🔒',
      type: 'danger',
      boldText: 'Uh Oh!',
      regularText: `Something unexpected went wrong, apologies for the inconvenience. Please report this issue using the 'Report a Bug' field below.`
    }
  };
  linkData = [
    {
      src: "https://github.com/litchoir/updatedWebsite",
      text: "Github",
      svgPaths: ['M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z']
    },
    {
      src: "#",
      text: "Report a Bug",
      svgPaths: [
        'M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z',
        'M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'
      ]
    },
    {
      src: "https://litchoir.nd.edu",
      text: "Website",
      svgPaths: ['M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm4 8a4 4 0 0 1-8 0V5a4 4 0 1 1 8 0v6zM8 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5z']
    }
  ];

  generateDateHourFromNow() {
    const d = new Date();
    d.setTime(d.getTime() + MS_IN_AN_HOUR);
    return d;
  }

  logUserIn() {
    this.isLoading = true;
    this.sharedService.lchttp(
      'POST',
      'login',
      { password: this.password },
      false,
      500
    ).subscribe(
        data => {
          if (data.success) {
            this.currentAlert = 'success';
            this.cookieService.put(
              LC_COOKIE_KEY_NAME, 
              data.accessToken, 
              { expires: this.generateDateHourFromNow() }
            );
            this.router.navigateByUrl('/admin');
          } else {
            this.currentAlert = 'failure';
          }
          this.isLoading = false;
        },
        error => {
          this.currentAlert = error.status === 403 
            ? 'forbidden'
            : 'otherError';
          this.isLoading = false;
        }
      );
  }

  updateAlert() {

  }
}
