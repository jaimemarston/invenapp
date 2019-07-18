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
                id: 'proveedores',
                title: 'Proveedores - Clientes',
                type: 'item',
                icon: 'local_shipping',
                url: '/proveedores',
            },
            {
                id: 'materiales',
                title: 'Materiales',
                type: 'item',
                icon: 'print',
                url: '/materiales',
            },
            {
                id: 'movmaterial',
                title: 'Movimientos-Materiales',
                type: 'item',
                icon: 'email',
                url: '/movmaterial',
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
                title: 'Movimientos-Productos',
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

export const navigationEmpleados: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Opciones',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
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

export const navigationProduccion: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Opciones',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'articulos',
                title: 'Productos',
                type: 'item',
                icon: 'print',
                url: '/articulos',
            },
            {
                id: 'cotizacion',
                title: 'Movimientos-Productos',
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
