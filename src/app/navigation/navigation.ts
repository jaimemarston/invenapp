import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Opciones',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'users',
                title: 'Usuarios',
                type: 'item',
                icon: 'directions_walk',
                url: '/users',
            },
            
            {
                id: 'clientes',
                title: 'Clientes',
                type: 'item',
                icon: 'local_shipping',
                url: '/clientes',
            },
            {
                id: 'proveedores',
                title: 'Proveedores',
                type: 'item',
                icon: 'local_shipping',
                url: '/proveedores',
            },
            {
                id: 'articulosmat',
                title: 'Materiales',
                type: 'item',
                icon: 'print',
                url: '/articulosmat',
            },
            {
                id: 'articulos',
                title: 'Productos',
                type: 'item',
                icon: 'print',
                url: '/articulos',
            },
            {
                id: 'cotizacion',
                title: 'Movimientos',
                type: 'item',
                icon: 'email',
                url: '/cotizacion',
            },
            {
                id: 'reporte',
                title: 'Reportes',
                type: 'item',
                icon: 'print',
                url: '/reporte',
            },
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'collapsable',
                icon: 'email',
                children: [
                    {
                        id: 'dashboard_analytics',
                        title: 'Analitica',
                        type: 'item',
                        icon: 'email',
                        url: '/dashboards/analytics',
                    },
                    {
                        id: 'dashboard_projects',
                        title: 'Proyectos',
                        type: 'item',
                        icon: 'email',
                        url: '/dashboards/projects',
                    }
                ]
            },
        ]
    }
];
