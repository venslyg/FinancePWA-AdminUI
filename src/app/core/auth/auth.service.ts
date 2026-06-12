import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('jhi-authenticationToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('jhi-authenticationToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string; rememberMe?: boolean }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('/api/authenticate', {
            username: credentials.email,
            password: credentials.password,
            rememberMe: credentials.rememberMe || false
        }).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.id_token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Fetch user info
                return this._httpClient.get('/api/account').pipe(
                    map((user: any) => ({
                        id: user.login,
                        name: user.firstName + ' ' + user.lastName,
                        email: user.email,
                        avatar: user.imageUrl,
                        status: 'online',
                        authorities: user.authorities ?? [],
                    })),
                    switchMap((user: any) => {
                        // Store the user on the user service
                        this._userService.user = user;

                        // Return a new observable with the response
                        return of({ user, token: response.id_token });
                    })
                );
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Verify the token by fetching user account
        return this._httpClient.get('/api/account').pipe(
            catchError(() =>
                // Return false
                of(false)
            ),
            map((user: any) => ({
                id: user.login,
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
                avatar: user.imageUrl,
                status: 'online',
                authorities: user.authorities ?? [],
            })),
            switchMap((user: any) => {
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('jhi-authenticationToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
