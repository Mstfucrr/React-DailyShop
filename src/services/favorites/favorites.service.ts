import { makeRequest } from "../base/base";

const getFavorites = async (token: string) =>
  await makeRequest<any>("Favorites/GetFavorites", "GET", null, token);

const addFavorite = async (token: string, productId: number) =>
  await makeRequest<any>(
    `Favorites/AddFavorite?productId=${productId}`,
    "POST",
    null,
    token,
  );

const deleteFavorite = async (token: string, favoriteId: number) =>
  await makeRequest<any>(
    `Favorites/DeleteFavorite?favoriteId=${favoriteId}`,
    "DELETE",
    null,
    token,
  );

export const favoritesService = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
