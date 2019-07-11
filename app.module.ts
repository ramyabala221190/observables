import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import {AppService} from './app.service';
import {newComponent} from './app.newcomponent';
import {BootComponent} from './BootComponent';

const routes:Routes=[
{
path:'',
redirectTo:'/app',
pathMatch:'full'
},
{path:'new',component:newComponent},
{path:'app',component:AppComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    newComponent,
    BootComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes)
  ],
  providers: [AppService],
  bootstrap: [BootComponent]
})
export class AppModule { }
