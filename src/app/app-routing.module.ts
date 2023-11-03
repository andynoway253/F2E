import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PompdoroComponent } from './2019/stage1/pompdoro.component';
import { MP3PlayerComponent } from './2019/stage3/mp3player.component';
import { IndexComponent } from './2019/stage3/index/index.component';
import { SongComponent } from './2019/stage3/song/song.component';
import { PaymentComponent } from './2019/stage4/payment.component';
import { MaskMapComponent } from './2019/stage10/mask-map.component';

const routes: Routes = [
  { path: 'Pompdoro', component: PompdoroComponent },
  {
    path: 'MP3Player',
    component: MP3PlayerComponent,
    children: [
      {
        path: '',
        redirectTo: 'Index',
        pathMatch: 'full',
      },
      {
        path: 'Index',
        component: IndexComponent,
      },
      {
        path: 'Song',
        component: SongComponent,
      },
    ],
  },
  {
    path: 'Payment',
    component: PaymentComponent,
  },
  {
    path: 'MaskMap',
    component: MaskMapComponent,
  },

  { path: '', redirectTo: '/Pompdoro', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
