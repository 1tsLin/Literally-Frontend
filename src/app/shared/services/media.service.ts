import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Media } from '../interfaces/media.model';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getMediaUrl(mediaId: string): string {
    return `${this.apiUrl}/medias/${mediaId}`;
  }

  getMedia(mediaId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/medias/${mediaId}`, {
      responseType: 'blob',
    });
  }

  createMedia(media: Media, file: File) {
    const formData = new FormData();

    formData.append(
      'dto',
      new Blob([JSON.stringify(media)], { type: 'application/json' }),
      'dto',
    );

    formData.append('file', file);

    return this.http.post<Media>(`${this.apiUrl}/medias`, formData);
  }

  updateMedia(mediaId: string, media: Media, file: File) {
    const formData = new FormData();

    formData.append(
      'dto',
      new Blob([JSON.stringify(media)], { type: 'application/json' }),
      'dto',
    );

    formData.append('file', file);

    return this.http.put<Media>(`${this.apiUrl}/medias/${mediaId}`, formData);
  }
}
