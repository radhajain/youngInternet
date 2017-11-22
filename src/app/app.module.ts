import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InfluencersComponent } from './components/influencers/influencers.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HttpModule } from '@angular/http';
import { DataService } from './services/data.service';
import { routedComponents, AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
