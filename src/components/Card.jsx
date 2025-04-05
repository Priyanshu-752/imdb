import Image from 'next/image';
import Link from 'next/link';
import { FiThumbsUp } from 'react-icons/fi';

export default function Card({ result }) {
  return (
    <div className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
      <Link href={`/movie/${result.imdbID}`}>
        <Image
          src={result.Poster !== 'N/A' ? result.Poster : 'https://via.placeholder.com/500x300?text=No+Image+Available'}
          width={500}
          height={300}
          alt={result.Title}
          className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300'
        />
        <div className='p-2'>
          <h2 className='text-lg font-bold truncate'>
            {result.Title}
          </h2>
          <p className='flex items-center'>
            {result.Year}
            <FiThumbsUp className='h-5 mr-1 ml-3' />
            {result.Type}
          </p>
        </div>
      </Link>
    </div>
  );
}
