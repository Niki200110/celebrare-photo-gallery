import { useState, useEffect } from "react";

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPhotos() {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("https://picsum.photos/v2/list?limit=30");
        if (!res.ok) {
          throw new Error("Photos fetch nahi ho payi");
        }
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message || "Kuch galat hua");
      } finally {
        setLoading(false);
      }
    }

    getPhotos();
  }, []);

  return { photos, loading, error };
}
