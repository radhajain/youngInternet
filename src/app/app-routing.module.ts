import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { InfluencersComponent } from './components/influencers/influencers.component'
import { SettingsComponent } from './components/settings/settings.component';
// import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'influencers', component: InfluencersComponent },  
  // { path: '', pathMatch: 'full', redirectTo: 'home'},
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false }),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
    InfluencersComponent,
    SettingsComponent
];
