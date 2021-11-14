import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { NavTabComponent } from './components/nav-tab/nav-tab.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PeopleComponent } from './components/people/people.component';
import { ToursComponent } from './components/tours/tours.component';
import { SharedModule } from '../shared/shared.module';
import { NewsItemsPipe, FeaturedVideoPipe, HomeBackgroundImagePipe  } from './components/home/home.pipe';
import { GraduateStudentsPipe, OfficersPipe, DirectorsPipe, PeopleBackgroundImagePipe } from './components/people/people.pipe';
import { ToursBackgroundImagePipe, ToursPipe } from './components/tours/tours.pipe';
import { AboutAuditionDeadlinePipe, AboutBackgroundImagePipe } from './components/about/about.pipe';

@NgModule({
  declarations: [
    AdminComponent,
    NavTabComponent,
    HomeComponent,
    AboutComponent,
    PeopleComponent,
    ToursComponent,
    HomeBackgroundImagePipe,
    NewsItemsPipe,
    FeaturedVideoPipe,
    AboutBackgroundImagePipe,
    AboutAuditionDeadlinePipe,
    PeopleBackgroundImagePipe,
    OfficersPipe,
    GraduateStudentsPipe,
    DirectorsPipe,
    ToursBackgroundImagePipe,
    ToursPipe
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class AdminModule { }
