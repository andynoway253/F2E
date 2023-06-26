import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MP3PlayerComponent } from "./mp3player.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,


  ],
  declarations: [MP3PlayerComponent],
  exports: [MP3PlayerComponent],
})
export class MP3PlayerModule {}
