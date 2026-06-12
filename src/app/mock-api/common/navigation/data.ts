/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

const financeNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
    {
        id: 'branch',
        title: 'Branches',
        type: 'basic',
        icon: 'heroicons_outline:map',
        link: '/branch',
    },
    {
        id: 'accounts',
        title: 'Accounts',
        type: 'collapsable',
        icon: 'heroicons_outline:banknotes',
        children: [
            {
                id: 'account-set',
                title: 'Chart of Accounts',
                type: 'basic',
                icon: 'heroicons_outline:briefcase',
                link: '/account-set',
            },
            {
                id: 'income-entry',
                title: 'Income Entries',
                type: 'basic',
                icon: 'heroicons_outline:currency-dollar',
                link: '/income-entry',
            },
            {
                id: 'expense',
                title: 'Expense',
                type: 'collapsable',
                icon: 'heroicons_outline:folder',
                children: [
                    {
                        id: 'expense-category',
                        title: 'Expense Categories',
                        type: 'basic',
                        icon: 'heroicons_outline:folder',
                        link: '/expense-category',
                    },
                    {
                        id: 'expense-sub-category',
                        title: 'Expense Subcategories',
                        type: 'basic',
                        icon: 'heroicons_outline:folder-open',
                        link: '/expense-sub-category',
                    },
                ],
            },
            {
                id: 'expense-entry',
                title: 'Expense Entries',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/expense-entry',
            },
            {
                id: 'petty-cash-ledger',
                title: 'Petty Cash Ledger',
                type: 'basic',
                icon: 'heroicons_outline:calculator',
                link: '/petty-cash-ledger',
            },
            {
                id: 'bank-ledger',
                title: 'Bank Ledger',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/bank-ledger',
            },
            {
                id: 'donation-tracker',
                title: 'Donation Tracker',
                type: 'basic',
                icon: 'heroicons_outline:heart',
                link: '/donation-tracker',
            },
            {
                id: 'liability-log',
                title: 'Liability Log',
                type: 'basic',
                icon: 'heroicons_outline:document-duplicate',
                link: '/liability-log',
            },
        ],
    },
    {
        id: 'assets',
        title: 'Assets',
        type: 'collapsable',
        icon: 'heroicons_outline:cube',
        children: [
            {
                id: 'asset-category',
                title: 'Asset Categories',
                type: 'basic',
                icon: 'heroicons_outline:archive-box',
                link: '/asset-category',
            },
            {
                id: 'asset-sub-category',
                title: 'Asset Subcategories',
                type: 'basic',
                icon: 'heroicons_outline:archive-box-x-mark',
                link: '/asset-sub-category',
            },
            {
                id: 'asset-register',
                title: 'Asset Register',
                type: 'basic',
                icon: 'heroicons_outline:cube',
                link: '/asset-register',
            },
            {
                id: 'asset-depreciation-history',
                title: 'Depreciation History',
                type: 'basic',
                icon: 'heroicons_outline:clock',
                link: '/asset-depreciation-history',
            },
            {
                id: 'maintenance-log',
                title: 'Maintenance Log',
                type: 'basic',
                icon: 'heroicons_outline:wrench-screwdriver',
                link: '/maintenance-log',
            },
        ],
    },
    {
        id: 'inventory',
        title: 'Inventory',
        type: 'collapsable',
        icon: 'heroicons_outline:shopping-bag',
        children: [
            {
                id: 'inventory-item',
                title: 'Inventory Items',
                type: 'basic',
                icon: 'heroicons_outline:shopping-bag',
                link: '/inventory-item',
            },
            {
                id: 'bin-card-line',
                title: 'Bin Card Lines',
                type: 'basic',
                icon: 'heroicons_outline:list-bullet',
                link: '/bin-card-line',
            },
        ],
    },
    {
        id: 'liability',
        title: 'Liability',
        type: 'collapsable',
        icon: 'heroicons_outline:document-duplicate',
        children: [
            {
                id: 'budget-plan',
                title: 'Budget Plans',
                type: 'basic',
                icon: 'heroicons_outline:scale',
                link: '/budget-plan',
            },
        ],
    },
    {
        id: 'people',
        title: 'People',
        type: 'collapsable',
        icon: 'heroicons_outline:users',
        children: [
            {
                id: 'church-staff',
                title: 'Church Staff',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/church-staff',
            },
            {
                id: 'salary-payout',
                title: 'Salary Payouts',
                type: 'basic',
                icon: 'heroicons_outline:receipt-percent',
                link: '/salary-payout',
            },
        ],
    },
];

export const defaultNavigation: FuseNavigationItem[] = financeNavigation;
export const compactNavigation: FuseNavigationItem[] = financeNavigation;
export const futuristicNavigation: FuseNavigationItem[] = [...financeNavigation];
export const horizontalNavigation: FuseNavigationItem[] = [...financeNavigation];
