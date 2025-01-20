import { User } from '../entities/user.entity';
import { UserInterface } from '../interfaces/user.interface';

export class LinkTransformer {
  /**
   *
   * @param link
   * @returns
   */
  static make(user: User, token = null): UserInterface {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      mobile: user.mobile,
      createdAt: user.createdAt,
      accessToken: token,
      links: user.links,
    };
  }

  static collection(users: User[]): UserInterface[] {
    return users.map((user): UserInterface => this.make(user));
  }
}
