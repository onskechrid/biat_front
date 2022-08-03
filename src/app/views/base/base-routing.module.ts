import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddfonctionComponent } from './addfonction/addfonction.component';

import { DatabaseComponent } from './database/database.component';
import { EditfonctionComponent } from './editfonction/editfonction.component';
import { FonctionsComponent } from './fonctions/fonctions.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { TablesComponent } from './tables/tables.component';
import { HistoriqueComponent} from './historique/historique.component'
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base de données',
    },
    children: [
      {
        path: 'database',
        component: DatabaseComponent,
        data: {
          title: 'Conception',
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
          title: 'Fonctions'
        }
      },
      {
        path: 'historique',
        component: HistoriqueComponent,
        data: {
          title: 'Historique des fonctions'
        }
      },
      {
        path: 'addfonction',
        component: AddfonctionComponent,
        data: {
          title: 'AJouter une fonction'
        }
      },
      {
        path: 'editfonction/:id',
        component: EditfonctionComponent,
        data: {
          title: 'Modifier une fonction'
        }
      },
      {
        path: 'powerbi',
        component: PowerbiComponent,
        data: {
          title: 'Powerbi'
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Utilisateurs'
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

