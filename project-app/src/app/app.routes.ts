import { Routes } from '@angular/router';

import { HeaderComponent } from './Layout/header/header.component';
import { PagesModule } from './Pages/pages/pages/pages.module';
import { LayoutComponent } from './Layout/Layoutcomponent/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Pages/pages/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
];
