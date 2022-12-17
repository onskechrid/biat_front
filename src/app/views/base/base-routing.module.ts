import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddfonctionComponent } from './addfunction/addfonction.component';

import { DatabaseComponent } from './database/database.component';
import { EditfonctionComponent } from './editfunction/editfonction.component';
import { FonctionsComponent } from './functions/fonctions.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { TablesComponent } from './tables/tables.component';
import { FilterComponent } from './filter/filter.component';
import { HistoriqueComponent } from './history/historique.component';

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
        path: 'filter',
        component: FilterComponent,
        data: {
          title: 'Filtre'
        }
      },
      {
        path: 'addfonction',
        component: AddfonctionComponent,
        data: {
          title: 'Ajouter une fonction'
        }
      },
      {
        path: 'addfonction/:query',
        component: AddfonctionComponent,
        data: {
          title: 'Ajouter une fonction'
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
        path: 'historique',
        component: TablesComponent,
        data: {
          title: 'Historique',
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

