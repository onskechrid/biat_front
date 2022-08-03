import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Accueil',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Conception',
    url: '/base/database',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Tables',
    url: '/base/tables',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Fonctions',
    url: '/base/fonctions',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Historique des fonctions',
    url: '/base/historique',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Utilisateurs',
    url: '/base/users',
    iconComponent: { name: 'cil-pencil' }
  }
  
];
