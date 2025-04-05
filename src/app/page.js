import Results from '@/components/Results';

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || 'fetchTrending';
  
  try {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    };

    // Use 'avengers' as default search term to get some initial movies
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=avengers&type=movie&page=1`;

    console.log('Fetching from URL:', url);

    const res = await fetch(url, options);
    const data = await res.json();
    
    if (data.Error) {
      throw new Error(data.Error);
    }

    if (!data || !data.Search) {
      throw new Error('No movies found');
    }

    const results = data.Search;

    return (
      <div>
        <Results results={results} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-bold text-red-600">Error loading movies</h1>
        <p className="mt-2">Error details: {error.message}</p>
        <p className="mt-2">Please check your internet connection and try again.</p>
      </div>
    );
  }
}
