import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import dayjs from 'dayjs';
import { forkJoin, take } from 'rxjs';

import { AdvanceService } from '../entities/advance/service/advance.service';
import { EmployeeService } from '../entities/employee/service/employee.service';
import { LandService } from '../entities/land/service/land.service';
import { LoanService } from '../entities/loan/service/loan.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    private readonly landService = inject(LandService);
    private readonly employeeService = inject(EmployeeService);
    private readonly loanService = inject(LoanService);
    private readonly advanceService = inject(AdvanceService);
    private readonly _userService = inject(UserService);

    isFinanceOnly: boolean = false;

    summaryCards = [
        {
            key: 'lands',
            label: 'Lands',
            value: '0',
            hint: 'Registered lands',
            route: '/land',
        },
        {
            key: 'employees',
            label: 'Employees',
            value: '0',
            hint: 'Active employees',
            route: '/employee',
        },
        {
            key: 'loans',
            label: 'Loans',
            value: '0',
            hint: 'Open loans',
            route: '/loan',
        },
        {
            key: 'advances',
            label: 'Advances',
            value: '0',
            hint: 'This month',
            route: '/advance',
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
        const monthStart = dayjs().startOf('month').format('YYYY-MM-DD');
        const monthEnd = dayjs().endOf('month').format('YYYY-MM-DD');

        forkJoin({
            lands: this.landService.query({ page: 0, size: 1 }),
            employees: this.employeeService.query({
                page: 0,
                size: 1,
                'active.equals': true,
                'isDraft.equals': false,
                'isPrivate.equals': false,
            }),
            loans: this.loanService.query({
                page: 0,
                size: 1,
                'active.equals': true,
            }),
            advances: this.advanceService.query({
                page: 0,
                size: 1,
                'date.greaterThanOrEqual': monthStart,
                'date.lessThanOrEqual': monthEnd,
            }),
        }).subscribe({
            next: (res) => {
                this.setCardValue(
                    'lands',
                    this.getTotalCount(
                        res.lands.headers,
                        res.lands.body?.length
                    )
                );
                this.setCardValue(
                    'employees',
                    this.getTotalCount(
                        res.employees.headers,
                        res.employees.body?.length
                    )
                );
                this.setCardValue(
                    'loans',
                    this.getTotalCount(
                        res.loans.headers,
                        res.loans.body?.length
                    )
                );
                this.setCardValue(
                    'advances',
                    this.getTotalCount(
                        res.advances.headers,
                        res.advances.body?.length
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
        return this.isFinanceOnly
            ? this.summaryCards.filter((card) => card.key !== 'lands')
            : this.summaryCards;
    }

    private _hasFinanceOnlyAuthority(user?: User | null): boolean {
        if (!user?.authorities?.length) {
            return false;
        }
        return false;
    }
}
