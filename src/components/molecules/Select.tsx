import React from 'react';
import { useState, useMemo } from 'react';

import './select.css';
import { IconButton } from '../atoms';

interface data {
  id: number;
  name: string;
}

interface Props {
  data: data[];
  onSelect: (id: number) => void;
}
// placeholder
const Select: React.FC<Props> = ({ data, onSelect }) => {
  const [search, setSearch] = useState<string>('');

  const dataFilter = useMemo(
    () =>
      search.length
        ? data.filter(elm =>
            elm.name.toLowerCase().includes(search.toLowerCase()) || elm.id.toString().slice(0, search.length).includes(search)
          )
        : [],
    [search],
  );

  const display = useMemo(
    () => (dataFilter.length ? 'block' : 'none'),
    [dataFilter],
  );

  return (
    <div className="select-global-container">
      <div
        className="select-container"
        style={
          display == 'block'
            ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
            : {}
        }>
        <div className="content">
          <input
            type="text"
            placeholder="Rechercher"
            onChange={e => setSearch(e.target.value)}
          />
          <IconButton img="search" imgClassName="img" className="button" />
        </div>
      </div>

      <div className="result-container" style={{ display: display }}>
        <div className="overflow-scrollbar">
          {dataFilter.map(elm => (
            <div className="item" onClick={() => onSelect(elm.id)} key={elm.id}>
              <p>
                {elm.id} - {elm.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
