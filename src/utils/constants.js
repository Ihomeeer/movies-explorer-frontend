// адреса всякие
const moviesApiUrl = "https://api.nomoreparties.co/beatfilm-movies";
const mainApiUrl = "https://api.ihomeer-movies.nomoredomains.monster";
// const mainApiUrl = "http://localhost:3001";
const serverUrl = "https://api.nomoreparties.co";

// длительность короткометражек, ширина экрана и количество карточек на рендер
const ShortMoviesDuration = 40;
const MobileWidth = 320;
const TabletWidth = 768;
const DesktopWidth = 1280;
const DesktopCardsAmount = { total: 12, delta: 3 };
const TabletCardsAmount = { total: 8, delta: 2 };
const MobileCardsAmount = { total: 5, delta: 2 };

// коды ошибок
const ConflictErrorCode = "409";
const UnauthorizedErrorCode = "401";
const BadRequestErrorCode = "400";

export {
  moviesApiUrl,
  mainApiUrl,
  serverUrl,
  ShortMoviesDuration,
  MobileWidth,
  TabletWidth,
  DesktopWidth,
  MobileCardsAmount,
  TabletCardsAmount,
  DesktopCardsAmount,
  ConflictErrorCode,
  UnauthorizedErrorCode,
  BadRequestErrorCode
}
