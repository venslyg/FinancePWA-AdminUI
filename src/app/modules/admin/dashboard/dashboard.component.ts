import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { forkJoin, take } from 'rxjs';

import { AccountSetService } from '../entities/account-set/service/account-set.service';
import { BranchService } from '../entities/branch/service/branch.service';
import { ChurchStaffService } from '../entities/church-staff/service/church-staff.service';
import { ExpenseEntryService } from '../entities/expense-entry/service/expense-entry.service';
import { IncomeEntryService } from '../entities/income-entry/service/income-entry.service';
import { AssetRegisterService } from '../entities/asset-register/service/asset-register.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    private readonly branchService = inject(BranchService);
    private readonly accountSetService = inject(AccountSetService);
    private readonly incomeEntryService = inject(IncomeEntryService);
    private readonly expenseEntryService = inject(ExpenseEntryService);
    private readonly assetRegisterService = inject(AssetRegisterService);
    private readonly churchStaffService = inject(ChurchStaffService);
    private readonly _userService = inject(UserService);

    isFinanceOnly: boolean = false;

    summaryCards = [
        {
            key: 'branches',
            label: 'Branches',
            value: '0',
            hint: 'Active branch workspaces',
            route: '/branch',
        },
        {
            key: 'accounts',
            label: 'Chart of Accounts',
            value: '0',
            hint: 'Configured ledger accounts',
            route: '/account-set',
        },
        {
            key: 'incomeEntries',
            label: 'Income Entries',
            value: '0',
            hint: 'Recorded income transactions',
            route: '/income-entry',
        },
        {
            key: 'expenseEntries',
            label: 'Expense Entries',
            value: '0',
            hint: 'Recorded expense transactions',
            route: '/expense-entry',
        },
        {
            key: 'assets',
            label: 'Assets',
            value: '0',
            hint: 'Registered fixed assets',
            route: '/asset-register',
        },
        {
            key: 'staff',
            label: 'Church Staff',
            value: '0',
            hint: 'Active staff records',
            route: '/church-staff',
        },
    ];

    ngOnInit(): void {
        this.isFinanceOnly = this._hasFinanceOnlyAuthority(
            this._userService.currentUser
        );

        this._userService.user$
            .pipe(take(1))
            .subscribe((user) => {
                this.isFinanceOnly = this._hasFinanceOnlyAuthority(user);
            });

        this.loadSummary();
    }

    private loadSummary(): void {
        forkJoin({
            branches: this.branchService.query({ page: 0, size: 1 }),
            accounts: this.accountSetService.query({ page: 0, size: 1 }),
            incomeEntries: this.incomeEntryService.query({ page: 0, size: 1 }),
            expenseEntries: this.expenseEntryService.query({ page: 0, size: 1 }),
            assets: this.assetRegisterService.query({ page: 0, size: 1 }),
            staff: this.churchStaffService.query({
                page: 0,
                size: 1,
                'isActive.equals': true,
            }),
        }).subscribe({
            next: (res) => {
                this.setCardValue(
                    'branches',
                    this.getTotalCount(
                        res.branches.headers,
                        res.branches.body?.length
                    )
                );
                this.setCardValue(
                    'accounts',
                    this.getTotalCount(
                        res.accounts.headers,
                        res.accounts.body?.length
                    )
                );
                this.setCardValue(
                    'incomeEntries',
                    this.getTotalCount(
                        res.incomeEntries.headers,
                        res.incomeEntries.body?.length
                    )
                );
                this.setCardValue(
                    'expenseEntries',
                    this.getTotalCount(
                        res.expenseEntries.headers,
                        res.expenseEntries.body?.length
                    )
                );
                this.setCardValue(
                    'assets',
                    this.getTotalCount(
                        res.assets.headers,
                        res.assets.body?.length
                    )
                );
                this.setCardValue(
                    'staff',
                    this.getTotalCount(
                        res.staff.headers,
                        res.staff.body?.length
                    )
                );
            },
        });
    }

    private setCardValue(key: string, value: number): void {
        const card = this.summaryCards.find((item) => item.key === key);
        if (card) {
            card.value = value.toString();
        }
    }

    private getTotalCount(
        headers: HttpHeaders | null | undefined,
        fallback: number | undefined
    ): number {
        const headerValue = headers?.get('X-Total-Count');
        const parsed = headerValue ? Number(headerValue) : Number.NaN;
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
        return fallback ?? 0;
    }

    get summaryCardsForDisplay() {
        return this.summaryCards;
    }

    private _hasFinanceOnlyAuthority(user?: User | null): boolean {
        if (!user?.authorities?.length) {
            return false;
        }
        return false;
    }
}
