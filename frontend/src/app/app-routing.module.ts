import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Pompdoro',
    loadChildren: () =>
      import('./2019/stage1/pompdoro.module').then((m) => m.PompdoroModule),
  },
  {
    path: 'FreeCell',
    loadChildren: () =>
      import('./2019/stage2/freeCell.module').then((m) => m.FreeCellModule),
  },
  {
    path: 'MP3Player',
    loadChildren: () =>
      import('./2019/stage3/mp3player.module').then((m) => m.MP3PlayerModule),
  },
  {
    path: 'Payment',
    loadChildren: () =>
      import('./2019/stage4/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: 'Game',
    loadChildren: () =>
      import('./2019/stage5/game.module').then((m) => m.GameModule),
  },
  {
    path: 'Chatroom',
    loadChildren: () =>
      import('./2019/stage7/chatroom.module').then((m) => m.ChatroomModule),
  },
  {
    path: 'Note',
    loadChildren: () =>
      import('./2019/stage9/note.module').then((m) => m.NoteModule),
  },
  {
    path: 'MaskMap',
    loadChildren: () =>
      import('./2019/stage10/mask-map.module').then((m) => m.MaskMapModule),
  },

  { path: '', redirectTo: '/Pompdoro', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
