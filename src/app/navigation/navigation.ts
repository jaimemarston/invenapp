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
                url: '/sunred/users',
            },
            
            {
                id: 'clientes',
                title: 'Clientes',
                type: 'item',
                icon: 'local_shipping',
                url: '/sunred/clientes',
            },
            {
                id: 'proveedores',
                title: 'Proveedores',
                type: 'item',
                icon: 'local_shipping',
                url: '/sunred/proveedores',
            },
            {
                id: 'articulosmat',
                title: 'Articulos - Materiales',
                type: 'item',
                icon: 'print',
                url: '/sunred/articulosmat',
            },
            {
                id: 'articulos',
                title: 'Articulos - Venta',
                type: 'item',
                icon: 'print',
                url: '/sunred/articulos',
            },
            {
                id: 'cotizacion',
                title: 'Movimientos',
                type: 'item',
                icon: 'email',
                url: '/sunred/cotizacion',
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
                        url: '/sunred/dashboards/analytics',
                    },
                    {
                        id: 'dashboard_projects',
                        title: 'Proyectos',
                        type: 'item',
                        icon: 'email',
                        url: '/sunred/dashboards/projects',
                    }
                ]
            },
        ]
    }
];
