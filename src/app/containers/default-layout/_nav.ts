import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Accueil',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Conception',
    url: '/base/database',
    iconComponent: { name: 'cil-pen' }
  },
  {
    name: 'Tables',
    url: '/base/tables',
    iconComponent: { name: 'cil-border-all' }
  },
  {
    name: 'Fonctions',
    url: '/base/fonctions',
    iconComponent: { name: 'cil-Task' }
  },
  {
    name: 'Historique des fonctions',
    url: '/base/historique',
    iconComponent: { name: 'cil-history' }
  },
  {
    name: 'Utilisateurs',
    url: '/base/users',
    iconComponent: { name: 'cil-user' }
  }
  
];
