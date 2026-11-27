import { Link } from 'react-router-dom';

import { Star } from './Icons';

export default function MovieShowCard({ extraClasses = undefined, name, date, rating, poster_path, }) {
  return (
    <li className={`movie-show-card card${extraClasses !== undefined ? ` ${extraClasses}` : ''}`}>
      <Link to={``} className='card__link'>
        <div className='card__wrap'>
          <div className="card__title-wrap">
            <div className='card__title card-title'>
              <h4 className='card-title__text'>{name}</h4>
              <div className='card-title__metadata card-metadata'>
                <div className="card-metadata__year">{date}</div>
                <div className="card-metadata__rating metadata-rating">
                  <div className="metadata-rating__star">
                    <Star></Star>
                  </div>
                  <div className="metadata-rating__text">{rating}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='card__image'>
            <img 
              src={`http://image.tmdb.org/t/p/w500/${poster_path}`} 
              loading='lazy'
              decoding='async'
              fetchPriority='low'
              alt={name}
              onDragStart={(e) => e.preventDefault()}
              />
          </div>
        </div>
      </Link>
    </li>
  );
}