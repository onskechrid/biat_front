import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';
import { AddfonctionComponent } from './addfonction/addfonction.component';

import { DatabaseComponent } from './database/database.component';
import { EditfonctionComponent } from './editfonction/editfonction.component';
import { FonctionsComponent } from './fonctions/fonctions.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      {
        path: 'database',
        component: DatabaseComponent,
        data: {
          title: 'Database',
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables',
        }
      },
      {
        path: 'fonctions',
        component: FonctionsComponent,
        data: {
          title: 'Fonctions Page'
        }
      },
      {
        path: 'addfonction',
        component: AddfonctionComponent,
        data: {
          title: 'Add-function page'
        }
      },
      {
        path: 'editfonction',
        component: EditfonctionComponent,
        data: {
          title: 'Edit-function page'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register page'
        }
      },
      {
        path: 'powerbi',
        component: PowerbiComponent,
        data: {
          title: 'powerbi page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

