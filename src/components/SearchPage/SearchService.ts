import { Params } from "react-router-dom";

export const getNewParamsPath = (type: 'books' | 'authors', params : Params<string>) : string => {
  // Обновляем только searchType, остальные параметры сохраняем
  console.log(params);
  // Создаем строку запроса, исключая пустые параметры
  const queryString = Object.entries(params)
    .map(([key, value]) => (value && key != 'type') ? `${value}` : '')
    .filter(Boolean)
    .join('/');

  console.log(`query = ${queryString}`)
  // Строим новый путь, оставляя старые параметры и обновляя только `type`
  const newPath = `/search/${type}${queryString ? '/' + queryString : ''}`;
  return newPath;
}