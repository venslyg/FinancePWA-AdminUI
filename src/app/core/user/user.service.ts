import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { map, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _httpClient = inject(HttpClient);
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _currentUser: User | null = null;

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._currentUser = value;
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    get currentUser(): User | null {
        return this._currentUser;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in user data
     */
    get(): Observable<User> {
        return this._httpClient.get('/api/account').pipe(
            map((user: any) => {
                const firstName = (user.firstName ?? '').trim();
                const lastName = (user.lastName ?? '').trim();
                let name = [firstName, lastName].filter(Boolean).join(' ').trim();

                if (
                    firstName &&
                    lastName &&
                    firstName.toLowerCase() === lastName.toLowerCase()
                ) {
                    name = firstName;
                }

                if (!name) {
                    name = user.login || user.email || 'Administrator';
                }

                return {
                    id: user.login,
                    name,
                    email: user.email,
                    avatar: user.imageUrl,
                    status: 'online', // or whatever
                    authorities: user.authorities ?? [],
                };
            }),
            tap((user) => {
                this.user = user;
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this.user = response;
            })
        );
    }
}
