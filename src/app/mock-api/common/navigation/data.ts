/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/dashboard'
    },
    {
        id   : 'land',
        title: 'Land',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/land'
    },
    {
        id   : 'employee',
        title: 'Employee',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/employee'
    },
    {
        id   : 'advance',
        title: 'Advance Payments',
        type : 'basic',
        icon : 'heroicons_outline:currency-dollar',
        link : '/advance'
    },
  
    {
        id   : 'loan',
        title: 'Loan',
        type : 'basic',
        icon : 'heroicons_outline:banknotes',
        link : '/loan'
    },
    {
        id   : 'role',
        title: 'Role Management',
        type : 'basic',
        icon : 'heroicons_outline:briefcase',
        link : '/role'
    },
    {
        id   : 'salary',
        title: 'Salary',
        type : 'basic',
        icon : 'heroicons_outline:document-text',
        link : '/salary-sheet'
    },{
        id   : 'epf',
        title: 'EPF Report',
        type : 'basic',
        icon : 'heroicons_outline:banknotes',
        link : '/epf'
    }
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/dashboard'
    },
    {
        id   : 'land',
        title: 'Land',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/land'
    },
    {
        id   : 'employee',
        title: 'Employees',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/employee'
    },
    {
        id   : 'advance',
        title: 'Advance Payments',
        type : 'basic',
        icon : 'heroicons_outline:currency-dollar',
        link : '/advance'
    },
    
    {
        id   : 'loan',
        title: 'Loans',
        type : 'basic',
        icon : 'heroicons_outline:banknotes',
        link : '/loan'
    },
    {
        id   : 'role',
        title: 'Roles',
        type : 'basic',
        icon : 'heroicons_outline:briefcase',
        link : '/role'
    },
    {
        id   : 'salary',
        title: 'Salary',
        type : 'basic',
        icon : 'heroicons_outline:document-text',
        link : '/salary-sheet'
    },{
        id   : 'epf',
        title: 'EPF Report',
        type : 'basic',
        icon : 'heroicons_outline:banknotes',
        link : '/epf'
    }
];

export const futuristicNavigation: FuseNavigationItem[] = [...compactNavigation];
export const horizontalNavigation: FuseNavigationItem[] = [...compactNavigation];
