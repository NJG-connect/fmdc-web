import React, { useState } from 'react';

import './input.css';
import { IconButton } from './';

interface Props {
  name: string;
  type: 'text' | 'password' | 'number' | 'datetime-local';
  onChange: (value: string) => void;
  className?: string;
  classNameContainer?: string;
  placeholder?: string;
  value?: string | number | null;
}

const Input: React.FC<Props> = ({
  name,
  type,
  onChange,
  className = '',
  classNameContainer = '',
  placeholder,
  value,
}) => {
  const [inputType, setInputType] = useState<
    'text' | 'password' | 'number' | 'date' | 'datetime-local'
  >(type);
  const [eye, setEye] = useState<'eye' | 'closedEye'>('eye');

  function handleState() {
    inputType === 'text' ? setInputType('password') : setInputType('text');
    eye === 'eye' ? setEye('closedEye') : setEye('eye');
  }

  return (
    <div className={`${classNameContainer} container`}>
      <p className="title">{name}</p>
      <input
        type={inputType}
        value={value || undefined}
        onChange={e => onChange(e.target.value)}
        className={`${className} input`}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <IconButton
          img={eye}
          className="icon"
          imgClassName="img"
          onClick={handleState}
        />
      )}
    </div>
  );
};

export default Input;
