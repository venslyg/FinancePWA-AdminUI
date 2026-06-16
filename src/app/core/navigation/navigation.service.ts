import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from 'app/core/user/user.service';
import { Observable, ReplaySubject, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _httpClient = inject(HttpClient);
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);
    private readonly _userService = inject(UserService);
    private readonly _financeNavigationIds = new Set([
        'dashboard',
        'branch',
        'account-set',
        'income-entry',
        'expense-category',
        'expense-entry',
        'bank-ledger',
        'petty-cash-ledger',
        'asset-category',
        'asset-sub-category',
        'asset-register',
        'asset-depreciation-history',
        'inventory-item',
        'bin-card-line',
        'liability-log',
        'budget-plan',
        'maintenance-log',
        'church-staff',
        'salary-payout',
        'donation-tracker',
    ]);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            map((navigation) => this._getNavigationForCurrentUser(navigation)),
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }

    private _getNavigationForCurrentUser(
        navigation: Navigation
    ): Navigation {
        const authorities =
            this._userService.currentUser?.authorities ?? [];

        if (this._isFinanceOnly(authorities)) {
            return this._filterNavigation(navigation);
        }

        return navigation;
    }

    private _filterNavigation(navigation: Navigation): Navigation {
        return {
            compact: this._filterNavigationItems(
                navigation.compact,
                this._financeNavigationIds
            ),
            default: this._filterNavigationItems(
                navigation.default,
                this._financeNavigationIds
            ),
            futuristic: this._filterNavigationItems(
                navigation.futuristic,
                this._financeNavigationIds
            ),
            horizontal: this._filterNavigationItems(
                navigation.horizontal,
                this._financeNavigationIds
            ),
        };
    }

    private _filterNavigationItems(
        items: Navigation['default'],
        allowedIds: ReadonlySet<string>
    ): Navigation['default'] {
        return items
            .map((item) => this._filterNavigationItem(item, allowedIds))
            .filter((item): item is NonNullable<typeof item> => item !== null);
    }

    private _filterNavigationItem(
        item: Navigation['default'][number],
        allowedIds: ReadonlySet<string>
    ): Navigation['default'][number] | null {
        const hasAllowedId = allowedIds.has(item.id ?? '');

        if (item.children?.length) {
            const children = this._filterNavigationItems(
                item.children as Navigation['default'],
                allowedIds
            );

            if (hasAllowedId || children.length > 0) {
                return {
                    ...item,
                    children,
                };
            }
        }

        if (hasAllowedId) {
            return item;
        }

        return null;
    }

    private _isFinanceOnly(authorities: string[]): boolean {
        return false;
    }
}
