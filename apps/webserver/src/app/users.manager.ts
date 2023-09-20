import { Injectable } from '@nestjs/common';

/**
 *
 */
export interface User {
  /**
   *
   */
  id: string;

  /**
   *
   */
  name: string;
}

/**
 *
 */
@Injectable()
export class UsersManager {
  /**
   *
   */
  private users: User[] = [];

  /**
   *
   * @param user
   */
  addUser(user: User) {
    this.users.push(user);
  }

  /**
   *
   * @param id
   */
  removeUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    return this.users.splice(index, 1)[0];
  }

  /**
   *
   * @returns
   */
  getAll() {
    return this.users;
  }

  /**
   *
   * @param id
   * @returns
   */
  getById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
