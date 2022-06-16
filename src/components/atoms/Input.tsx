import React from 'react';

import './input.css';

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
  return (
    <div className="container">
      <p className="title">{name}</p>
      <input
        type={type}
        onChange={e => onChange(e.target.value)}
        className={`${className} input`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
