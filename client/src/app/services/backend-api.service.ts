import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {


  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    // FormData is basically a data format that allows us to combine text values and blobs or file values
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/files`);
  }

  emptyDirectory(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/files`);
  }

  // getAll(): Observable<any> {
  //   return this.http.get(baseUrl);
  // };

  // get(id): Observable<any> {
  //   return this.http.get(`${baseUrl}/${id}`);
  // };

  // create(data): Observable <any> {
  //   return this.http.post(baseUrl, data);
  // };

  // update(id, data): Observable <any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // delete(id): Observable <any> {
  //   return this.http.delete(`${baseUrl}/${id}`)
  // }
  // deleteAll(): Observable <any> {
  //   return this.http.delete(baseUrl);
  // }
}
