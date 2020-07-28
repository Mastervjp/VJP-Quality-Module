import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    exp: number;
    iat: number;
    role:string;
}

interface TokenResponse {
    token: string;
    user: any;
    role:string;
}

export interface TokenPayload {
    email: string;
    password: string;
    name?: string;
}

@Injectable()
export class AuthenticationService {
    private token: string;
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient, private router: Router) { }

    private saveToken(token: string): void {
        localStorage.setItem('mean-token', token);
        this.token = token;
    }

    private getToken(): string {
            this.token = localStorage.getItem('mean-token');
            return this.token;
    }


    public isAdmin() {
       
        const role = localStorage.getItem('role');
        if (role == "SA" || role == "NA" || localStorage.getItem('adminLogRole') == "tec"){
            return true;
        } else {
            return false;
        }
    }

    public isSuperAdmin() {
        const role = localStorage.getItem('role');
        if (role == "SA") {
            return true;
        } else {
            return false;
        }
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();

        if (user) {
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    private request(method: 'post' | 'get', type: 'login' | 'register', user?: TokenPayload) {
        let base;

        if (method === 'post') {
            base = this.http.post(this.API_URL + `/api/auth/${type}`, user);
        } else {
            base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
        }

        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token)
                    localStorage.setItem('u_name', data.user.name);
                    localStorage.setItem('role', data.user.role);
                }
                return data;
            })
        );
        return request;
    }

    // public register(user: TokenPayload): Observable<any> {
    //     return this.request('post', 'register', user);
    // }

    public login(user: TokenPayload) {
        return this.request('post', 'login', user);
    }

    logout() {
        this.token = '';
        window.localStorage.removeItem('mean-token');
        localStorage.clear();
        this.router.navigateByUrl('/');
    }

}