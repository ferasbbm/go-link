import { User } from '../entities/user.entity';
import { UserInterface } from '../interfaces/user.interface';

export class UserTransformer {
  /**
   *
   * @param link
   * @returns
   */
  static make(
    user: User,
    accessToken: string = null,
    refreshToken: string = null,
  ): UserInterface {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      mobile: user.mobile,
      createdAt: user.createdAt,
      accessToken,
      refreshToken,
      links: user.links,
    };
  }

  static collection(users: User[]): UserInterface[] {
    return users.map((user: User): UserInterface => this.make(user));
  }
}
