import { hash } from "bcrypt";
import { AuthService } from ".";
import { HASH_SALT, R_CODES } from "../Contants";
import { User, UserRole, sequelize } from "../Database";
import { PublicUserDTO, UserCreateDTO, UserUpdateDTO } from "../Dto";

export class UserService {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async create(payload: UserCreateDTO) {
    const newUser = await User.create({ id: -1, ...payload });

    const { email } = newUser.dataValues;

    const validatedUser = await this.authService.login({
      email,
      password: payload.password,
    });

    if (typeof validatedUser === "number") return validatedUser;

    const { token, ...user } = validatedUser;

    return { user: user as PublicUserDTO, token };
  }

  async update(user: PublicUserDTO, payload: UserUpdateDTO) {
    const { id } = user;

    const transaction = await sequelize.transaction();
    try {
      if (payload.password !== undefined && payload.password.length < 6) {
        delete payload.password;
      } else if (payload.password) {
        payload.password = await hash(payload.password, HASH_SALT);
      }

      await User.update(payload, { where: { id }, transaction });
      const candidate = await User.findOne({ where: { id }, transaction });

      if (!candidate) throw new Error();

      await transaction.commit();
      const { email, password } = candidate.dataValues;

      const validatedUser = await this.authService.login(
        { email, password },
        true
      );

      if (typeof validatedUser === "number") return validatedUser;

      const { token, ...user } = validatedUser;

      return { user: user as PublicUserDTO, token };
    } catch (_) {
      await transaction.rollback();
      return R_CODES.INTERNAL_ERROR;
    }
  }

  async getRoleByUser(id: number) {
    const user = await User.findOne({ where: { id } });
    if (!user) return R_CODES.NOT_FOUND;

    const { role } = user.dataValues;
    const roleObj = await UserRole.findOne({ where: { id: role } });
    if (!roleObj) return R_CODES.NOT_FOUND;

    return roleObj.dataValues;
  }
}
