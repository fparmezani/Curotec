export class LocalStorageUtils {
  public getUser() {
    const user = localStorage.getItem('app.user');
    return user ? JSON.parse(user) : null;
  }

  public saveLocalUserData(response: any) {
    this.saveUserToken(response.accessToken);
    this.saveUser(response.userToken);
  }

  public clearLocalUserData() {
    localStorage.removeItem('app.token');
    localStorage.removeItem('app.user');
  }

  public getUserToken(): string | any {
    return localStorage.getItem('app.token');
  }

  public saveUserToken(token: string) {
    localStorage.setItem('app.token', token);
  }

  public saveUser(user: string) {
    localStorage.setItem('app.user', JSON.stringify(user));
  }
}
