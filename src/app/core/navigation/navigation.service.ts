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
        'employee',
        'loan',
        'role',
        'salary',
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
        return items.filter((item) =>
            allowedIds.has(item.id ?? '')
        );
    }

    private _isFinanceOnly(authorities: string[]): boolean {
        return false;
    }
}
