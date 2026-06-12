import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_BASE_URL, API_IMAGE_PUBLIC_BASE } from './api.constants';

interface UploadResponse {
    url: string;
}

@Injectable({ providedIn: 'root' })
export class ImageUploadService {
    private readonly http = inject(HttpClient);
    private readonly uploadEndpoint = '/api/image/upload';
    private readonly apiBase = API_BASE_URL;
    private readonly image = API_IMAGE_PUBLIC_BASE;


    upload(file: File): Observable<string> {
        const formData = new FormData();
        formData.append('imageFile', file, file.name);

        return this.http.post<UploadResponse>(this.uploadEndpoint, formData).pipe(map((res) => res.url));
    }

    buildFullUrl(path: string | null | undefined): string {
        if (!path) {
            return '';
        }
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }

        const normalized = path.startsWith('/') ? path : `/${path}`;
        if (normalized.startsWith('/images/')) {
            return normalized;
        }
        if (normalized.startsWith('/api/public/images')) {
            return `${this.apiBase}${normalized}`;
        }
        if (normalized.startsWith('/api/image')) {
            return `${this.apiBase}${normalized.replace('/api/image', '/api/public/images')}`;
        }
        return `${this.apiBase}${this.image}${normalized}`;
    }
}
