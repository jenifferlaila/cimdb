import axios from "axios";

import {
  MovieCreateDTO,
  MovieDTO,
  PublicUserDTO,
  UserDTO,
  UserLoginCredentialsDTO,
  UserLoginResponseDTO,
  UserRatingCreateDTO,
  UserRoleDTO,
  UserUpdateDTO,
} from "./types";
import { API_URL, BEARER, TOKEN_KEY } from "../utils";

export async function login(email: string, password: string) {
  const url = `${API_URL}/auth/login`;

  try {
    const res = await axios({
      method: "POST",
      url,
      data: { email, password } as UserLoginCredentialsDTO,
    });

    if (res.status >= 300) return null;

    return res.data as UserLoginResponseDTO;
  } catch (_) {
    return null;
  }
}

export async function auth(token: string) {
  const url = `${API_URL}/auth/auth`;

  try {
    const res = await axios({
      url,
      method: "POST",
      headers: { Authorization: `${BEARER} ${token}` },
    });

    if (res.status >= 300) return null;

    return res.data as PublicUserDTO;
  } catch (_) {
    return null;
  }
}

export async function getRoleByUserId(id: number) {
  const url = `${API_URL}/user/${id}/role`;

  try {
    const res = await axios({
      url,
      method: "GET",
    });

    if (res.status >= 300) return null;

    return res.data as UserRoleDTO;
  } catch (_) {
    return null;
  }
}

export async function rateMovie(token: string, rating: UserRatingCreateDTO) {
  const url = `${API_URL}/movie/rate`;

  try {
    const res = await axios({
      url,
      data: rating,
      method: "PATCH",
      headers: { Authorization: `${BEARER} ${token}` },
    });

    if (res.status >= 300) return false;

    return true;
  } catch (_) {
    return false;
  }
}

export async function createMovie(token: string, movie: MovieCreateDTO) {
  const url = `${API_URL}/movie/create`;

  try {
    const res = await axios({
      url,
      data: movie,
      method: "POST",
      headers: { Authorization: `${BEARER} ${token}` },
    });

    if (res.status >= 300) return false;

    return true;
  } catch (_) {
    return false;
  }
}

export async function getAllMovies() {
  const url = `${API_URL}/movie/`;

  try {
    const res = await axios({
      url,
      method: "GET",
    });

    if (res.status >= 300) return null;

    return res.data as MovieDTO[];
  } catch (_) {
    return null;
  }
}

export async function updateUser(token: string, data: UserUpdateDTO) {
  const url = `${API_URL}/user/update`;

  try {
    const res = await axios({
      url,
      data,
      method: "POST",
      headers: { Authorization: `${BEARER} ${token}` },
    });

    if (res.status >= 300) return false;

    return true;
  } catch (_) {
    return false;
  }
}

export async function getFullUser(token: string) {
  const url = `${API_URL}/auth/`;

  try {
    const res = await axios({
      url,
      method: "POST",
      headers: { Authorization: `${BEARER} ${token}` },
    });

    if (res.status >= 300) return null;

    return res.data as UserDTO;
  } catch (_) {
    return null;
  }
}

export function saveToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (_) {
    console.error("Could not save login info to browser.");
  }
}

export function deleteToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (_) {
    console.error("Could not remove login info from the browser.");
  }
}

export async function validateToken(): Promise<
  [string | null, PublicUserDTO | null]
> {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return [token, null];

  return [token, await auth(token)];
}
