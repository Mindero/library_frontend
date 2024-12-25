export const logo = 'src\\components\\image\\logo.jpg';

const PREFIX = "http://127.0.0.1:8020/api";

const READER_PREFIX = PREFIX + "/readers";
export const READER_REGISTER_URL = READER_PREFIX + "/auth/register";
export const READER_LOGIN_URL = READER_PREFIX + "/auth/login";
export const READER_GET_URL = READER_PREFIX + "/get_reader/{reader_id}";
export const READER_GET_ALL_URL = READER_PREFIX + "/all_readers";
export const READER_ADD = READER_PREFIX + "/add_reader";
export const READER_UPDATE = READER_PREFIX + "/update_reader/";
export const READER_DELETE = READER_PREFIX + "/delete_reader/";
export const READER_GET_PENALTY = READER_PREFIX + "/get_penalty/{reader_id}";

const VIEW_BOOK_PREFIX = PREFIX + "/view_book";
export const VIEW_BOOKS_GET_ALL_URL = VIEW_BOOK_PREFIX + "/all_view_books/";
export const VIEW_BOOKS_GET_BY_NAME = VIEW_BOOK_PREFIX + "/";
export const VIEW_BOOKS_GET_BY_AUTHOR_ID = VIEW_BOOK_PREFIX + "/author/";

const BOOK_PREFIX = PREFIX + "/books";
export const GET_BOOK_BY_NAME_URL = BOOK_PREFIX + "/book_info/";
export const BOOK_GET_ALL = BOOK_PREFIX + "/all_books";
export const BOOK_ADD = BOOK_PREFIX + "/add_book";
export const BOOK_UPDATE = BOOK_PREFIX + "/update_book/";
export const BOOK_DELETE = BOOK_PREFIX + "/delete_book/";

const AUTHOR_PREFIX = PREFIX + "/authors"
export const AUTHOR_GET_BY_ID_URL = AUTHOR_PREFIX + "/";
export const AUTHOR_GET_ALL = AUTHOR_PREFIX + "/all_authors";
export const AUTHOR_GET_ALL_COUNTRIES = AUTHOR_PREFIX + "/all_countries";
export const AUTHOR_ADD = AUTHOR_PREFIX + "/add_author";
export const AUTHOR_UPDATE = AUTHOR_PREFIX + "/update_author/";
export const AUTHOR_DELETE = AUTHOR_PREFIX + "/delete_author/";

const INSTANCE_PREFIX = PREFIX + "/book_instance";
export const INSTANCE_GET = INSTANCE_PREFIX + "/get_free_instances/";
export const INSTANCE_GET_ALL = INSTANCE_PREFIX  + "/all_view_book_instance";
export const INSTANCE_ADD = INSTANCE_PREFIX  + "/add_bookInstance";
export const INSTANCE_UPDATE = INSTANCE_PREFIX  + "/update_bookInstance/";
export const INSTANCE_DELETE = INSTANCE_PREFIX  + "/delete_bookInstance/";
export const INSTANCE_SUPPLY_GET_ALL = INSTANCE_PREFIX + "/get_supply_books"
export const INSTANCE_SUPPLY_DELETE = INSTANCE_PREFIX + "/delete_supply_books"
export const INSTANCE_SUPPLY_ADD = INSTANCE_PREFIX + "/create_supply_books"

export const BOOK_READER_GET = PREFIX + "/book_reader/profile_books/";
export const BOOK_READER_ADD = PREFIX + "/book_reader/add_bookReader";
export const BOOK_READER_CREATE = PREFIX + "/book_reader/add_bookReader";
export const BOOK_READER_GET_ALL = PREFIX + "/book_reader/all_view_book_reader";
export const BOOK_READER_DELETE = PREFIX + "/book_reader/delete_bookReader/";
export const BOOK_READER_UPDATE = PREFIX + "/book_reader/update_bookReader/";
export const BOOK_READER_ORDERS_ALL = PREFIX + "/book_reader/all_orders/";


const PUBLISHER_PREFIX = PREFIX + "/publishers";
export const PUBLISHER_GET_ALL = PUBLISHER_PREFIX  + "/all_publishers";
export const PUBLISHER_ADD = PUBLISHER_PREFIX  + "/add_publisher";
export const PUBLISHER_UPDATE = PUBLISHER_PREFIX  + "/update_publisher/";
export const PUBLISHER_DELETE = PUBLISHER_PREFIX  + "/delete_publisher/";

const GENRES_PREFIX = PREFIX + "/genres";
export const GENRE_GET_ALL = GENRES_PREFIX  + "/all_genres";
export const GENRE_ADD = GENRES_PREFIX  + "/add_genre";
export const GENRE_UPDATE = GENRES_PREFIX  + "/update_genre/";
export const GENRE_DELETE = GENRES_PREFIX  + "/delete_genre/";

const BOOK_GENRES_PREFIX = PREFIX + "/book_genres";
export const BOOK_GENRE_GET_ALL = BOOK_GENRES_PREFIX  + "/all_view_book_genres";
export const BOOK_GENRE_ADD = BOOK_GENRES_PREFIX  + "/add_bookGenres";
export const BOOK_GENRE_UPDATE = BOOK_GENRES_PREFIX  + "/update_bookGenres/";
export const BOOK_GENRE_DELETE = BOOK_GENRES_PREFIX  + "/delete_bookGenres/";

const BOOK_PUBLISHER_PREFIX = PREFIX + "/book_publisher";
export const BOOK_PUBLISHER_GET_ALL = BOOK_PUBLISHER_PREFIX  + "/all_view_book_publisher";
export const BOOK_PUBLISHER_ADD = BOOK_PUBLISHER_PREFIX  + "/add_bookPublisher";
export const BOOK_PUBLISHER_UPDATE = BOOK_PUBLISHER_PREFIX  + "/update_bookPublisher/";
export const BOOK_PUBLISHER_DELETE = BOOK_PUBLISHER_PREFIX  + "/delete_bookPublisher/";

const PENALTY_PREFIX = PREFIX + "/penalty"
export const PENALTY_GET_ALL = PENALTY_PREFIX  + "/all_penalty";
export const PENALTY_ADD = PENALTY_PREFIX  + "/add_penalty";
export const PENALTY_UPDATE = PENALTY_PREFIX  + "/update_penalty/";
export const PENALTY_DELETE = PENALTY_PREFIX  + "/delete_penalty/";
export const PENALTY_GET_READERS = PENALTY_PREFIX + "/get_all_readers";
export const PENALTY_VIEW_GET_ALL = PENALTY_PREFIX + "/all_view_penalty";

const AUTHORS_BOOK_PREFIX = PREFIX + "/authors_book"
export const AUTHORS_BOOK_GET_ALL = AUTHORS_BOOK_PREFIX + "/all_view_authorsBook"
export const AUTHORS_BOOK_ADD = AUTHORS_BOOK_PREFIX + "/add_authorBook"
export const AUTHORS_BOOK_UPDATE = AUTHORS_BOOK_PREFIX + "/update_authorBook/"
export const AUTHORS_BOOK_DELETE = AUTHORS_BOOK_PREFIX + "/delete_authorBook/"