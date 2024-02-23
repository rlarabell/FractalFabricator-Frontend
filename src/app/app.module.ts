import { BrowserModule } from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CanvasComponent } from "./canvas/canvas.component";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
