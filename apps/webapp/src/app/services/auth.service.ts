import { isNil } from 'lodash';

/**
 *
 */
export class AuthService {
  /**
   *
   */
  private static USERNAME_SS_KEY = 'auth_ss_username';

  /**
   *
   */
  private static _instance: AuthService;

  /**
   *
   */
  static get instance() {
    if (isNil(this._instance)) {
      this._instance = new AuthService();
    }
    return this._instance;
  }

  /**
   *
   */
  get username() {
    return sessionStorage.getItem(AuthService.USERNAME_SS_KEY);
  }

  /**
   *
   */
  private constructor() {
    // empty
  }

  /**
   *
   * @param username
   */
  login(username: string) {
    sessionStorage.setItem(AuthService.USERNAME_SS_KEY, username);
  }

  /**
   * 
   */
  logout() {
    sessionStorage.removeItem(AuthService.USERNAME_SS_KEY);
  }
}
