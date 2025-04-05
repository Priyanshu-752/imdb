import Image from 'next/image';

export default async function MoviePage({ params }) {
  const movieId = params.id;
  
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${movieId}`
    );
    
    if (!res.ok) {
      throw new Error('Failed to fetch movie details');
    }
    
    const movie = await res.json();

    if (movie.Error) {
      throw new Error(movie.Error);
    }

    return (
      <div className='w-full'>
        <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
          <Image
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x300?text=No+Image+Available'}
            width={500}
            height={300}
            alt={movie.Title}
            className='rounded-lg'
            style={{ maxWidth: '100%', height: '100%' }}
          />
          <div className='p-2'>
            <h2 className='text-lg mb-3 font-bold'>{movie.Title}</h2>
            <p className='text-lg mb-3'>{movie.Plot}</p>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Year:</span>
              {movie.Year}
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Rating:</span>
              {movie.imdbRating}
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Director:</span>
              {movie.Director}
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Cast:</span>
              {movie.Actors}
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Genre:</span>
              {movie.Genre}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-bold text-red-600">Error loading movie details</h1>
        <p className="mt-2">Error details: {error.message}</p>
      </div>
    );
  }
}
