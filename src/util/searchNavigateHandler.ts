export const navigateHandler = (parms:any, navigate: Function) => {
  const params = new URLSearchParams();
  Object.entries(parms).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, String(value));
    }
  });
  // Переход по адресу с query параметрами
  navigate(`/search?${params.toString()}`);
};