import { Genre } from "../reducer/catalogStore/initState";
import { setShowCatalogSideBar } from "../reducer/settingsStore";
import { AppDispatch } from "../store";
import { navigateHandler } from "./searchNavigateHandler";

export const genresToHtml = (genres: Genre[], dispatch: AppDispatch, navigate:Function) : JSX.Element => {
  return (<ul>
    {genres.map((genre: Genre) => {
      return (
        <li onClick={() => {
          dispatch(setShowCatalogSideBar(false));
          navigateHandler({ type: "books", genre: genre.url }, navigate);
        } }>
          {genre.name}
        </li>
      );
    })}
  </ul>);
}
