import { Op } from "sequelize";
import { ADMIN, R_CODES } from "../Contants";
import { Movie, User, UserRating, UserRole, sequelize } from "../Database";
import {
  MovieCreateDTO,
  MovieUpdateDTO,
  PublicUserDTO,
  UserRatingCreateDTO,
} from "../Dto";

export class MovieService {
  async create(user: PublicUserDTO, payload: MovieCreateDTO) {
    const role = await UserRole.findOne({ where: { id: user.role } });
    if (!role || role.dataValues.value !== ADMIN) return R_CODES.UNAUTHORIZED;

    const movie = await Movie.create({ ...payload });
    if (!movie) return R_CODES.INTERNAL_ERROR;

    return movie.dataValues;
  }

  async update(user: PublicUserDTO, payload: MovieUpdateDTO) {
    const role = await UserRole.findOne({ where: { id: user.role } });
    if (!role || role.dataValues.value !== ADMIN) return R_CODES.UNAUTHORIZED;

    const transaction = await sequelize.transaction();

    try {
      await Movie.update(payload, { where: { id: payload.id } });

      const movie = await Movie.findOne({ where: { id: payload.id } });
      if (!movie) throw new Error();

      return movie.dataValues;
    } catch (_) {
      await transaction.rollback();

      return R_CODES.INTERNAL_ERROR;
    }
  }

  async rate(user: PublicUserDTO, rating: UserRatingCreateDTO) {
    if (rating.user !== user.id) return R_CODES.UNAUTHORIZED;

    const candidate = await User.findOne({ where: { id: user.id } });
    const movie = await Movie.findOne({ where: { id: rating.movie } });
    if (!candidate || !movie) return R_CODES.NOT_FOUND;

    const transaction = await sequelize.transaction();
    try {
      await UserRating.destroy({
        where: { [Op.and]: [{ user: user.id }, { movie: rating.movie }] },
        transaction,
      });

      await UserRating.create({ ...rating }, { transaction });

      const { rating: oldRating } = movie.dataValues;

      const newRating = (oldRating + rating.rating - 1) / 2;

      await Movie.update(
        { rating: Math.round((newRating + Number.EPSILON) * 100) / 100 },
        { where: { id: rating.movie }, transaction }
      );

      await transaction.commit();
      return true;
    } catch (_) {
      await transaction.rollback();
      return R_CODES.INTERNAL_ERROR;
    }
  }

  async getAll() {
    return await Movie.findAll();
  }
}
