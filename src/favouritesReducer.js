export const initialFavourites =
  JSON.parse(localStorage.getItem("favourites")) || [];

export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const id = action.payload;
      const isFav = state.includes(id);
      const updated = isFav
        ? state.filter((item) => item !== id)
        : [...state, id];

      
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    }
    default:
      return state;
  }
}
