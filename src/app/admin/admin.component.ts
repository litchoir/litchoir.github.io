import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'lc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public activeRoute: string = 'home';
  private acceptableRoutes = ['home', 'about', 'people', 'tours'];
  public tabUnderlineMarginPercentage: number = 0;
  public isAdminDataLoading = true;
  public data: any = {};

  constructor(
    route: ActivatedRoute, 
    router: Router,
    private sharedService: SharedService
  ) {
    route.queryParams.subscribe(queryParams => {
      if (this.acceptableRoutes.includes(queryParams.tab)) {
        this.tabUnderlineMarginPercentage = this.acceptableRoutes.indexOf(queryParams.tab) * 25;
        this.activeRoute = queryParams.tab;
      }
      else router.navigateByUrl('admin?tab=home');
    });
  }

  ngOnInit() {
    this.sharedService.getJSONFileContents().subscribe(
      (data: any) => {
        this.isAdminDataLoading = false;
        this.data = data;
        console.log(data);
      },
      (error: any) => { console.log(error)}
    );
  }

  modifyClientTextContent(payload: any) {
    const { mode, id } = payload;
    console.log(`in admin modifyClientTextContent with payload: ${JSON.stringify(payload, null, 4)}`);
    if (mode === 'DELETE' && id) this.deleteInnerKeyFromObject(payload);
    else if (mode !== 'DELETE' && id) this.modifyInnerKeyFromObject(payload);
    else if (mode !== 'DELETE' && !id) this.modifyOuterKeyFromObject(payload);
    else throw new Error(`Attempt was made to delete outer key.`);
  }

  modifyInnerKeyFromObject(payload: any) {
    const { key, id, val } = payload;
    const temporaryItems = {
      ... this.data,
      [key]: {
        ... this.data[key],
        [id]: val
      }
    };
    const idsToDelete = Object.keys(this.data[key]).filter(k => k.length !== 64);
    for (let i of idsToDelete) { delete temporaryItems[key][i]; }
    this.data = temporaryItems;
  }
  modifyOuterKeyFromObject(payload: any) {
    console.log('modifying outer key of data! payload: ', JSON.stringify(payload, null, 4));
    const { key, val} = payload;
    this.data = {
      ... this.data,
      [key]: val
    };
  }
  deleteInnerKeyFromObject(payload: any) {
    const { key, id } = payload;
    const temporaryItems = { ... this.data };
    delete temporaryItems[key][id];
    const idsToDelete = Object.keys(this.data[key]).filter(k => k.length !== 64);
    for (let i of idsToDelete) { delete temporaryItems[key][i]; }
    this.data = temporaryItems;
  }
}
