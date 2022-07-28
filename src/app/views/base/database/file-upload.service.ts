import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
// API url
baseApiUrl = "http://localhost:3000/upload"
    
constructor(private http:HttpClient) { }

// Returns an observable
upload(file):Observable<any> {

    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with filue data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseApiUrl, formData)
}

}
