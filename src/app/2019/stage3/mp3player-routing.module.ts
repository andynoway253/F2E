import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MP3PlayerComponent } from './mp3player.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: 'MP3Player',
    component: MP3PlayerComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MP3PlayerRoutingModule {}
