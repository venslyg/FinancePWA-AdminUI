import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboard'
    {path: '', pathMatch : 'full', redirectTo: 'dashboard'},

    // Redirect signed-in user to the '/dashboard'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboard/dashboard.routes')},
            {path: 'branch', loadComponent: () => import('app/modules/admin/entities/branch/list/branch-list.component').then(m => m.BranchListComponent)},
            {path: 'account-set', loadComponent: () => import('app/modules/admin/entities/account-set/list/account-set-list.component').then(m => m.AccountSetListComponent)},
            {path: 'income-entry', loadComponent: () => import('app/modules/admin/entities/income-entry/list/income-entry-list.component').then(m => m.IncomeEntryListComponent)},
            {path: 'expense-category', loadComponent: () => import('app/modules/admin/entities/expense-category/list/expense-category-list.component').then(m => m.ExpenseCategoryListComponent)},
            {path: 'expense-sub-category', loadComponent: () => import('app/modules/admin/entities/expense-sub-category/list/expense-sub-category-list.component').then(m => m.ExpenseSubCategoryListComponent)},
            {path: 'expense-entry', loadComponent: () => import('app/modules/admin/entities/expense-entry/list/expense-entry-list.component').then(m => m.ExpenseEntryListComponent)},
            {path: 'bank-ledger', loadComponent: () => import('app/modules/admin/entities/bank-ledger/list/bank-ledger-list.component').then(m => m.BankLedgerListComponent)},
            {path: 'petty-cash-ledger', loadComponent: () => import('app/modules/admin/entities/petty-cash-ledger/list/petty-cash-ledger-list.component').then(m => m.PettyCashLedgerListComponent)},
            {path: 'asset-category', loadComponent: () => import('app/modules/admin/entities/asset-category/list/asset-category-list.component').then(m => m.AssetCategoryListComponent)},
            {path: 'asset-sub-category', loadComponent: () => import('app/modules/admin/entities/asset-sub-category/list/asset-sub-category-list.component').then(m => m.AssetSubCategoryListComponent)},
            {path: 'asset-register', loadComponent: () => import('app/modules/admin/entities/asset-register/list/asset-register-list.component').then(m => m.AssetRegisterListComponent)},
            {path: 'asset-depreciation-history', loadComponent: () => import('app/modules/admin/entities/asset-depreciation-history/list/asset-depreciation-history-list.component').then(m => m.AssetDepreciationHistoryListComponent)},
            {path: 'inventory-item', loadComponent: () => import('app/modules/admin/entities/inventory-item/list/inventory-item-list.component').then(m => m.InventoryItemListComponent)},
            {path: 'bin-card-line', loadComponent: () => import('app/modules/admin/entities/bin-card-line/list/bin-card-line-list.component').then(m => m.BinCardLineListComponent)},
            {path: 'liability-log', loadComponent: () => import('app/modules/admin/entities/liability-log/list/liability-log-list.component').then(m => m.LiabilityLogListComponent)},
            {path: 'budget-plan', loadComponent: () => import('app/modules/admin/entities/budget-plan/list/budget-plan-list.component').then(m => m.BudgetPlanListComponent)},
            {path: 'maintenance-log', loadComponent: () => import('app/modules/admin/entities/maintenance-log/list/maintenance-log-list.component').then(m => m.MaintenanceLogListComponent)},
            {path: 'church-staff', loadComponent: () => import('app/modules/admin/entities/church-staff/list/church-staff-list.component').then(m => m.ChurchStaffListComponent)},
            {path: 'salary-payout', loadComponent: () => import('app/modules/admin/entities/salary-payout/list/salary-payout-list.component').then(m => m.SalaryPayoutListComponent)},
            {path: 'donation-tracker', loadComponent: () => import('app/modules/admin/entities/donation-tracker/list/donation-tracker-list.component').then(m => m.DonationTrackerListComponent)},
        ]
    }
];
