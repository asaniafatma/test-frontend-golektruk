import { useEffect, useState } from "react";

export default function Soal3() {
  return <SearchComponent />;
}

function SearchComponent() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Menggunakan search sebagai ID untuk API
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${search}`);
      const data = await response.json();

      
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([data]); 
      }
    }

    if (search) fetchData();
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li> {/* Menggunakan title bukan name */}
        ))}
      </ul>
    </div>
  );
}
