import { useState, useReducer, useCallback, useMemo } from "react";
import { useFetchPhotos } from "./useFetchPhotos";
import { favouritesReducer, initialFavourites } from "./favouritesReducer";

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    initialFavourites,
  );

  
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    );
  }, [photos, searchTerm]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Photo Gallery</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by author name..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      
      {loading && (
        <div className="flex justify-center my-16">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-300 max-w-md mx-auto text-center">
          Error: {error}
        </div>
      )}

      {/* Responsive Grid: Desktop 4, Tablet 2, Mobile 1  */}
      {!loading && !error && (
        <>
          {filteredPhotos.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Koi photo nahi mili.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => {
                const isFav = favourites.includes(photo.id);
                return (
                  <div
                    key={photo.id}
                    className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white flex flex-col justify-between"
                  >
                    <img
                      src={`https://picsum.photos/id/${photo.id}/400/300`}
                      alt={photo.author}
                      className="w-full h-48 object-cover bg-gray-200"
                      loading="lazy"
                    />
                    <div className="p-4 flex justify-between items-center">
                      <span
                        className="font-medium text-gray-700 truncate mr-2"
                        title={photo.author}
                      >
                        {photo.author}
                      </span>
                      
                      <button
                        onClick={() =>
                          dispatch({
                            type: "TOGGLE_FAVOURITE",
                            payload: photo.id,
                          })
                        }
                        className="focus:outline-none cursor-pointer"
                        aria-label="favourite button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 transition-colors duration-150"
                          fill={isFav ? "red" : "none"}
                          stroke={isFav ? "red" : "gray"}
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
