import { useCallback, useEffect, useState } from 'react';
import { useAPI } from '../util/APIContext';
import styles from './Search.module.css';
import qs from 'qs';
import NextLink from './NextLink';
import Input from './Input';

const Search = () => {
  const [query, setQuery] = useState('');
  const [hotels, setHotels] = useState([]);

  const { get } = useAPI();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 1) {
        const currentQuery = query;

        const filters = {
          name: {
            $containsi: query,
          },
        };

        const result = await get('hotels?' + qs.stringify({ filters }));

        if (currentQuery === query) {
          setHotels(result.data);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query, get]);

  const handleSetQuery = useCallback((e) => {
    const query = e.target.value || '';
    setQuery(query);
  }, []);

  return (
    <div>
      <Input onChange={handleSetQuery} placeholder="Search hotels" />

      {query.length > 0 && (
        <div>
          {hotels.map((hotel) => {
            return (
              <NextLink
                key={hotel.id}
                href={{
                  pathname: '/hotels/[id]',
                  query: { id: hotel.id },
                }}
              >
                {hotel.attributes.name}
              </NextLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
