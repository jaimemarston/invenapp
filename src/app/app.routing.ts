import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AlitourGuard } from './core/guards/alitour.guard';
import { CafeGuard } from './core/guards/cafe.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './sunred/authentication/login/login.module#LoginModule'
    },
    {
        path: 'cafe',
        canActivate: [AuthGuard, CafeGuard],
        redirectTo: 'auth/login'
    },
    {
        path: '',
        canActivate: [AuthGuard, AlitourGuard],
        children: [
            {
                path: 'users',
                loadChildren: './sunred/users/users.module#UsersModule'
            },
            
            {
                path: 'clientes',
                loadChildren: './sunred/clientes/clientes.module#ClientesModule'
            },
            {
                path: 'proveedores',
                loadChildren: './sunred/proveedores/proveedores.module#ProveedoresModule'
            },
            {
                path: 'cotizacion',
                loadChildren: './sunred/cotizacion/cotizacion.module#CotizacionModule'
            },
            {
                path: 'movmaterial',
                loadChildren: './sunred/movmaterial/movmaterial.module#MovmaterialModule'
            },
            {
                path: 'materiales',
                loadChildren: './sunred/materiales/materiales.module#MaterialesModule'
            },
            {
                path: 'articulos',
                loadChildren: './sunred/articulos/articulos.module#ArticulosModule'
            },
            {
                path: 'reporte',
                loadChildren: './sunred/reporte/reporte.module#ReporteModule'
            },
            {
                path: 'repoemplea',
                loadChildren: './sunred/repoemplea/repoemplea.module#RepoempleaModule'
            },
            {
                path: 'empleados',
                loadChildren: './sunred/empleados/empleados.module#EmpleadosModule'
            },
            {
                path: 'empctacte',
                loadChildren: './sunred/empctacte/empctacte.module#EmpctactesModule'
            },
            {
                path: 'tareo',
                loadChildren: './sunred/tareo/tareo.module#TareoModule'
            },
            {
                path: 'recetas',
                loadChildren: './sunred/recetas/recetas.module#RecetasModule'
            },
            {
                path: 'dashboards/analytics',
                loadChildren: './sunred/dashboards/analytics/analytics.module#AnalyticsDashboardModule'
            },
            {
                path: 'dashboards/projects',
                loadChildren: './sunred/dashboards/project/project.module#ProjectDashboardModule'
            },
        ]
    },
];
