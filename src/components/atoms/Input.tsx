import React, { useState } from 'react';

import './input.css';
import { IconButton } from './';
import eye from '../../assets/images/eye.svg';

interface Props {
  name: string;
  type: 'text' | 'password';
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const Input: React.FC<Props> = ({
  name,
  type,
  onChange,
  className = '',
  placeholder,
}) => {
  const [inputType, setInputType] = useState<'text' | 'password'>(type);

  return (
    <div className="container">
      <p className="title">{name}</p>
      <input
        type={inputType}
        onChange={e => onChange(e.target.value)}
        className={`${className} input`}
        placeholder={placeholder}
      />
      {type == 'password' && (
        <IconButton
          img="folder"
          className="icon"
          imgClassName="img"
          onClick={() =>
            inputType == 'text'
              ? setInputType('password')
              : setInputType('text')
          }
        />
      )}
      {/* <div style={{ backgroundImage: `url(` + eye + `)` }}></div> */}
    </div>
  );
};

export default Input;
