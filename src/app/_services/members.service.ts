import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];


  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams) {

    console.log(userParams);

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize, userParams.minAge, userParams.maxAge, userParams.gender);

    console.log(params);



    return this.getPaginatedResult<Member[]>(this.baseUrl + "users", params);
  }

  private getPaginatedResult<T>(url, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: "response", params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get("Pagination") !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number, minAge: number, maxAge: number, gender: string) {
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber.toString());
    params = params.append("pageSize", pageSize.toString());
    params = params.append('minAge', minAge.toString());
    params = params.append('maxAge', maxAge.toString());
    params = params.append('gender', gender);

    return params;
  }

  getMember(username: string) {
    const member = this.members.find(x => x.userName === username)
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + "users/" + username);
  }

  updateMember(member: Member) {

    return this.http.put(this.baseUrl + "users", member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + "users/set-main-photo/" + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + "users/delete-photo/" + photoId);
  }
}
