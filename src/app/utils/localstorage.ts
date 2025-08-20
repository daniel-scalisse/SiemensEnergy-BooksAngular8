export class LocalStorageUtils {

    readonly _userPath: string = "books.user";
    readonly _tokenPath: string = "books.token";

    public getUser() {
        return JSON.parse(localStorage.getItem(this._userPath));
    }

    public saveLocalUserData(response: any) {
        this.saveUserToken(response.AccessToken);
        this.saveUser(response.UserToken);
    }

    public clearLocalUserData() {
        localStorage.removeItem(this._tokenPath);
        localStorage.removeItem(this._userPath);
    }

    public getUserToken(): string {
        return localStorage.getItem(this._tokenPath);
    }

    public saveUserToken(token: string) {
        localStorage.setItem(this._tokenPath, token);
    }

    public saveUser(user: string) {
        localStorage.setItem(this._userPath, JSON.stringify(user));
    }
}