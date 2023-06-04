import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PompdoroComponent } from './2019/stage1/pompdoro.component';
import { TestComponent } from './2019/stage2/test.component';

const routes: Routes = [
  { path: 'Pompdoro', component: PompdoroComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
