// This is an EJS template. It generates the list component TypeScript file.
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subject, catchError, finalize, forkJoin, map, merge, of, startWith, switchMap, tap, throwError } from 'rxjs';

// Angular Material & Fuse
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseConfirmationService } from '@fuse/services/confirmation';

// Application Imports
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';
import { SubZoneRefService } from 'app/modules/properties/entities/sub-zone-ref/service/sub-zone-ref.service';
import { ISubZoneRef } from 'app/modules/properties/entities/sub-zone-ref/sub-zone-ref.model';
import { ZoneRefService } from 'app/modules/properties/entities/zone-ref/service/zone-ref.service';
import { IZoneRef } from 'app/modules/properties/entities/zone-ref/zone-ref.model';
import { environment } from 'environments/environment';
import { KeycloakAdminService, UserRepresentation } from '../../../../../core/util/KeycloakAdminService';
import { ArchiveStatus } from '../../../enums/archive-status.model';
import { IAssociation, NewAssociation } from '../association.model';
import { AssociationService } from '../service/association.service';
import { AssociationFormGroup, AssociationFormService } from '../update/association-form.service';
import { OtpDialogComponent } from './otp-dialog.component';
import { ScreenCtrlPipe } from 'app/utils/screenctrl.pipe';

@Component({
    selector: 'app-association-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatSelectModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        ScreenCtrlPipe
    ],
    templateUrl: './association-list.component.html',
})
export class AssociationListComponent implements AfterViewInit, OnInit {
       readonly SCREEN='associations';
    // --- Injected Services ---
    private readonly associationService = inject(AssociationService);
    private readonly associationFormService = inject(AssociationFormService);
    private readonly zoneRefService: ZoneRefService = inject(ZoneRefService);
    private readonly subZoneRefService: SubZoneRefService = inject(SubZoneRefService);
    private readonly keycloakAdminService = inject(KeycloakAdminService);
    private readonly fuseConfirmationService = inject(FuseConfirmationService);
    private readonly snackBar = inject(MatSnackBar);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly dialog = inject(MatDialog);

    // --- State & Triggers ---
    isLoading = true;
    totalItems = 0;
    itemsPerPage = 10; // Default items per page
    private readonly refreshTrigger = new Subject<void>();
    private parentFilters: { [key: string]: string } = {};

    // --- Table & Drawer ---
    @ViewChild('matDrawer') matDrawer!: MatDrawer;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = [
        'id',
        'name',
        'description',
        'contactNumber',
        'archiveStatus',
        'address',
        'zone',
        'subZone',
        'keywords',
        'createdBy',
        'createdDate',
        'lastModifiedBy',
        'lastModifiedDate',
        'actions',
    ];
    dataSource = new MatTableDataSource<IAssociation>();

    // --- Form ---
    associationForm!: AssociationFormGroup;
    drawerMode: 'new' | 'edit' = 'new';
    private originalContactNumber: string = '';

    // --- Zone and SubZone data ---
    zones: IZoneRef[] = [];
    allSubZones: ISubZoneRef[] = [];
    filteredSubZones: ISubZoneRef[] = [];

    // --- Archive Status options ---
    archiveStatusOptions = Object.keys(ArchiveStatus);

    ngOnInit(): void {
        this.loadZones();
        this.loadSubZones();
    }

    ngAfterViewInit(): void {
        this.route.params
            .pipe(
                switchMap((params) => {
                    this.parentFilters = {};
                    const parentIdKey = Object.keys(params)[0];
                    if (parentIdKey) {
                        const parentModelName = parentIdKey.replace('Id', '');
                        this.parentFilters[`${parentModelName}Id.equals`] = params[parentIdKey];
                    }
                    return merge(this.sort.sortChange, this.paginator.page, this.refreshTrigger).pipe(startWith({}));
                })
            )
            .subscribe(() => this.loadData());
        this.loadData();
    }

    loadData(): void {
        if (!this.paginator) {
            return;
        }

        this.isLoading = true;
        const req = {
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
            sort: this.getSortParameters(),
            ...this.parentFilters,
        };

        this.associationService
            .query(req)
            .pipe(
                tap((res) => {
                    this.isLoading = false;
                    this.totalItems = Number(res.headers.get('X-Total-Count') ?? 0);
                    this.dataSource.data = res.body ?? [];
                }),
                catchError(() => {
                    this.isLoading = false;
                    return of(null);
                })
            )
            .subscribe();
    }

    getSortParameters(): string[] {
        if (!this.sort || !this.sort.active || this.sort.direction === '') {
            return ['id,asc'];
        }
        return [`${this.sort.active},${this.sort.direction}`];
    }

    openDrawer(id?: number): void {
        if (id) {
            this.drawerMode = 'edit';
            this.associationService.find(id).subscribe((response) => {
                if (response.body) {
                    this.associationForm = this.associationFormService.createAssociationFormGroup(response.body);
                    // Store original contact number for comparison
                    this.originalContactNumber = response.body.contactNumber?.toString() || '';
                    // Set zone and filter sub-zones for edit mode
                    if (response.body.zone) {
                        this.onZoneChange(response.body.zone.toString());
                        // After filtering sub-zones, set the selected sub-zone if it exists
                        if (response.body.subZone) {
                            this.associationForm.get('subZone')?.setValue(response.body.subZone.toString());
                        }
                    }
                    this.matDrawer.open();
                }
            });
        } else {
            this.drawerMode = 'new';
            this.originalContactNumber = '';
            this.associationForm = this.associationFormService.createAssociationFormGroup();
            this.matDrawer.open();
        }
    }

    closeDrawer(): void {
        this.matDrawer.close();
    }

    save(): void {
        if (this.associationForm.invalid) {
            return;
        }

        const association = this.associationFormService.getAssociation(this.associationForm);

        const saveObservable = this.drawerMode === 'new' ? this.createNewAssociation(association as NewAssociation) : this.updateAssociation(association);

        saveObservable.pipe(finalize(() => this.closeDrawer())).subscribe(() => {
            this.refreshTrigger.next();
            this.loadData();
        });
    }

    private createNewAssociation(association: NewAssociation): Observable<HttpResponse<IAssociation>> {
        // Generate association-specific role name
        const roleName = this.generateAssociationRoleName(association.name?.toString() ?? '');

        // First, check if the role already exists (which would indicate duplicate association)
        return this.keycloakAdminService.getRealmRoleByName(roleName).pipe(
            // If role exists, throw error for duplicate association
            map(() => {
                throw new Error(`An association with the name "${association.name}" already exists. Please choose a different name.`);
            }),
            catchError((error) => {
                // If role doesn't exist (404), proceed with creation
                if (error.status === 404) {
                    return this.proceedWithAssociationCreation(association, roleName);
                }
                // Re-throw other errors
                throw error;
            })
        );
    }

    private proceedWithAssociationCreation(association: NewAssociation, roleName: string): Observable<HttpResponse<IAssociation>> {
        // Generate password for new association
        const password = this.generateRandomPassword();

        // Set username as contact number
        const username = association.contactNumber?.toString() ?? '';

        // Define the Keycloak user object
        const newUser: UserRepresentation = {
            username: username,
            firstName: association.name?.toString() ?? '',
            lastName: 'Association', // Default last name for associations
            enabled: true,
            emailVerified: false,
            credentials: [
                {
                    type: 'password',
                    value: password,
                    temporary: true,
                },
            ],
        };


        return this.associationService.create(association).pipe(
            switchMap((associationResponse) => {
                // Association created successfully, now create the user
                return this.keycloakAdminService.createUser(newUser).pipe(map((createdUser) => ({ associationResponse, createdUser })));
            }),
            switchMap(({ associationResponse, createdUser }) => {
                this.snackBar.open('Keycloak user created successfully', 'Close', { duration: 3000 });

                // Create the association-specific role
                const newRole = {
                    name: roleName,
                    description: `Role for association: ${association.name}`,
                };

                return this.keycloakAdminService.createRealmRole(newRole).pipe(
                    tap(() => {
                        this.snackBar.open(`Role ${roleName} created successfully`, 'Close', { duration: 3000 });
                    }),
                    map(() => ({ associationResponse, createdUser })),
                    catchError((roleError) => {
                        // If role creation fails, we need to rollback the user creation and association
                        console.error('Role creation failed, attempting to rollback user and association:', roleError);
                        return forkJoin([this.keycloakAdminService.deleteUser(createdUser.id!), this.associationService.delete(associationResponse.body!.id!)]).pipe(
                            tap(() => console.log('User and association rolled back due to role creation failure')),
                            // Re-throw the original error
                            switchMap(() => throwError(() => roleError))
                        );
                    })
                );
            }),
            switchMap(({ associationResponse, createdUser }) => {
                // Assign the association-specific role to the user
                return this.keycloakAdminService.assignRealmRoleToUser(createdUser.id!, roleName).pipe(
                    tap(() => {
                        this.snackBar.open(`Role ${roleName} assigned to user`, 'Close', { duration: 3000 });
                    }),
                    map(() => associationResponse),
                    catchError((assignError) => {
                        // If role assignment fails, rollback user, role, and association
                        console.error('Role assignment failed, attempting full rollback:', assignError);
                        return forkJoin([
                            this.keycloakAdminService.deleteUser(createdUser.id!),
                            this.keycloakAdminService.deleteRealmRole(roleName),
                            this.associationService.delete(associationResponse.body!.id!),
                        ]).pipe(
                            tap(() => console.log('User, role, and association rolled back due to assignment failure')),
                            switchMap(() => throwError(() => assignError))
                        );
                    })
                );
            }),
            switchMap((associationResponse) => {
                if (associationResponse.body?.id) {
                    // Send OTP with credentials
                    const otpMessage = `Username: ${username}, OneTimePassword: ${password}`;
                    this.keycloakAdminService.sendMessage(otpMessage, username).subscribe(() => {
                        this.snackBar.open('OTP sent to contact number', 'Close', { duration: 3000 });
                    });
                    return of(associationResponse);
                }
                return of(null);
            }),
            tap({
                next: () => {
                    // All operations completed successfully
                    this.refreshTrigger.next();
                    this.loadData();
                },
                error: (err) => {
                    console.error('An error occurred during the association creation process:', err);
                    // Check if it's a duplicate association error
                    if (err.message && err.message.includes('already exists')) {
                        this.snackBar.open(err.message, 'Close', { duration: 5000 });
                    } else {
                        this.snackBar.open('Failed to create Association. All changes have been rolled back.', 'Close', { duration: 5000 });
                    }
                },
            })
        );
    }

    delete(id: number): void {
        const confirmation = this.fuseConfirmationService.open({
            title: 'Delete Association',
            message: 'Are you sure you want to delete this Association? This action cannot be undone.',
            actions: { confirm: { label: 'Delete' } },
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.associationService.delete(id).subscribe(() => {
                    this.refreshTrigger.next();
                    this.loadData();
                });
            }
        });
    }

    loadZones(): void {
        this.zoneRefService.query().subscribe((response) => {
            this.zones = response.body ?? [];
        });
    }

    loadSubZones(): void {
        this.subZoneRefService.query().subscribe((response) => {
            this.allSubZones = response.body ?? [];
        });
    }

    onZoneChange(selectedZoneName: string): void {
        if (selectedZoneName) {
            // Find the selected zone object
            const selectedZone = this.zones.find((zone) => zone.name === selectedZoneName);
            if (selectedZone) {
                // Filter sub-zones that belong to the selected zone
                this.filteredSubZones = this.allSubZones.filter((subZone) => subZone.zone?.id === selectedZone.id);
            }
        } else {
            this.filteredSubZones = [];
        }
        // Clear the sub-zone selection when zone changes
        this.associationForm.get('subZone')?.setValue(null);
    }

    generateRandomPassword(): string {
        const length = 8;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    }

    private generateAssociationRoleName(associationName: string): string {
        // Replace spaces with underscores and convert to uppercase
        return `ROLE_ASSOCIATION_USER_${associationName.replace(/\s+/g, '_').toUpperCase()}`;
    }

    private updateAssociation(association: IAssociation): Observable<HttpResponse<IAssociation>> {
        // Check if contact number has changed
        const newContactNumber = association.contactNumber?.toString();

        if (this.drawerMode === 'edit' && this.originalContactNumber !== newContactNumber) {
            // Contact number changed, need OTP validation and Keycloak update
            return this.handleContactNumberChange(association, this.originalContactNumber, newContactNumber || '');
        } else {
            // No contact number change, proceed with normal update
            return this.associationService.update(association);
        }
    }

    private handleContactNumberChange(association: IAssociation, originalContactNumber: string, newContactNumber: string): Observable<HttpResponse<IAssociation>> {
        // First, send OTP to new number
        const otp = this.generateOTP();
        const otpMessage = `Your contact number is being changed. OTP: ${otp}`;
        return this.keycloakAdminService.sendOTP(otpMessage, newContactNumber).pipe(
            switchMap(() => {
                // OTP sent, now prompt user to enter OTP
                return this.promptForOTP().pipe(
                    switchMap((enteredOTP) => {
                        if (enteredOTP === otp) {
                            // OTP validated, now update Keycloak user
                            return this.updateKeycloakUserForContactNumberChange(originalContactNumber, newContactNumber).pipe(
                                switchMap(() => {
                                    // Keycloak updated, now update association
                                    return this.associationService.update(association).pipe(
                                        tap(() => {
                                            // Check if current user is the one whose contact number changed
                                            this.checkIfCurrentUserNeedsLogout(originalContactNumber);
                                        })
                                    );
                                })
                            );
                        } else {
                            return throwError(() => new Error('Invalid OTP'));
                        }
                    })
                );
            })
        );
    }

    private generateOTP(): string {
        return Math.floor(100000 + Math.random() * 899999).toString();
    }

    private promptForOTP(): Observable<string> {
        return new Observable((observer) => {
            const dialogRef = this.dialog.open(OtpDialogComponent, {
                width: '420px',
                disableClose: true,
                data: { message: 'Enter the OTP sent to your new contact number' },
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    observer.next(result);
                    observer.complete();
                } else {
                    observer.error('OTP cancelled');
                }
            });
        });
    }

    private updateKeycloakUserForContactNumberChange(oldContactNumber: string, newContactNumber: string): Observable<void> {
        return this.keycloakAdminService.getUserByUsername(oldContactNumber).pipe(
            switchMap((user) => {
                if (user) {
                    user.username = newContactNumber;
                    return this.keycloakAdminService.updateUser(user);
                } else {
                    return throwError(() => new Error('User not found in Keycloak'));
                }
            })
        );
    }

    private checkIfCurrentUserNeedsLogout(originalContactNumber: string): void {
        // Check if current user is the one whose contact number changed
        this._userService.user$.subscribe((currentUser) => {
            if (currentUser && currentUser.email === originalContactNumber) {
                // Current user changed their contact number, prompt logout
                const confirmLogout = confirm('Your contact number has been changed. You need to logout and login again with the new number. Logout now?');
                if (confirmLogout) {
                    this.router.navigate(['/sign-out']);
                }
            }
        });
    }

    // Inject UserService
    private readonly _userService = inject(UserService);
}
