import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
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
  }
  
];
