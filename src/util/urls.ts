const PREFIX = "http://127.0.0.1:8020/api";

const READER_PREFIX = PREFIX + "/readers";
export const READER_REGISTER_URL = READER_PREFIX + "/auth/register";
export const READER_LOGIN_URL = READER_PREFIX + "/auth/login";
export const READER_GET_URL = READER_PREFIX + "/{reader_id}"

const VIEW_BOOK_PREFIX = PREFIX + "/view_book";
export const VIEW_BOOKS_GET_ALL_URL = VIEW_BOOK_PREFIX + "/all_view_books";
export const VIEW_BOOKS_GET_BY_NAME = VIEW_BOOK_PREFIX + "/";