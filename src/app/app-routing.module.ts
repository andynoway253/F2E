import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PompdoroComponent } from './2019/stage1/pompdoro.component';

const routes: Routes = [{ path: 'Pompdoro', component: PompdoroComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
