import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/Layoutcomponent/layout.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import("./Pages/pages.module").then((m) => m.PagesModule),
      },
    ],
  },
];
