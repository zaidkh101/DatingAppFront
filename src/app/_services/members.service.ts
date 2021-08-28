import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;


  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(userParams: UserParams) {
    this.userParams = userParams;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  addLike(member: any) {

    let userName = "";

    try {
      if (member.userName != null) {
        userName = member.userName;
      } else {
        userName = member.username;
      }

    } catch {
      userName = member.username;
    }


    return this.http.post(this.baseUrl + "likes/" + userName, {});
  }

  getLikes(predicate: string, pageNumber, pageSize) {
    let params = this.getPaginationHeadersLikes(pageNumber, pageSize, predicate);
    return this.getPaginatedResult<Partial<Member[]>>(this.baseUrl + "likes", params);
  }

  getMembers(userParams: UserParams) {

    var response = this.memberCache.get(Object.values(userParams).join("-"));

    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize, userParams.minAge, userParams.maxAge, userParams.gender, userParams.orderBy);

    return this.getPaginatedResult<Member[]>(this.baseUrl + "users", params).
      pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response)
        return response;
      }))
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

  private getPaginationHeaders(pageNumber: number, pageSize: number, minAge: number, maxAge: number, gender: string, orderBy: string) {
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber.toString());
    params = params.append("pageSize", pageSize.toString());
    params = params.append('minAge', minAge.toString());
    params = params.append('maxAge', maxAge.toString());
    params = params.append('gender', gender);
    params = params.append('orderBy', orderBy);

    return params;
  }

  private getPaginationHeadersLikes(pageNumber: number, pageSize: number, predicate: string) {
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber.toString());
    params = params.append("pageSize", pageSize.toString());
    params = params.append('predicate', predicate);
    return params;
  }

  getMember(username: string) {
    const member = [...this.memberCache.values()].reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: any) => member.userName === username || member.username === username );
    if (member) {
      return of(member);
    }
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
