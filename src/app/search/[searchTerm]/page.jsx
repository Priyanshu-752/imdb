import Results from '@/components/Results';

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;

  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${searchTerm}&type=movie`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await res.json();

    if (data.Error) {
      throw new Error(data.Error);
    }

    const results = data.Search;

    return (
      <div>
        <h1 className="text-center pt-6">Search Results for: {searchTerm}</h1>
        <Results results={results} />
      </div>
    );
  } catch (error) {
    console.error('Search error:', error);
    return (
      <div className="text-center pt-6">
        <h1 className="text-2xl">No results found for: {searchTerm}</h1>
        <p className="text-lg text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }
}
