import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PompdoroComponent } from './2019/stage1/pompdoro.component';
import { MP3PlayerComponent } from './2019/stage3/mp3player.component';

const routes: Routes = [
  { path: 'Pompdoro', component: PompdoroComponent },
  { path: 'MP3Player', component: MP3PlayerComponent },

  { path: '', redirectTo: '/Pompdoro', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
