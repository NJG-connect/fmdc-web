import React, { useState } from 'react';

import './input.css';
import { IconButton } from './';

interface Props {
  name: string;
  type: 'text' | 'password' | 'number' | 'date';
  onChange: (value: string) => void;
  className?: string;
  classNameContainer?: string;
  placeholder?: string;
  value?: string | number | null;
  list?: string;
  dataList?: { name: string; id: number | string }[];
}

const Input: React.FC<Props> = ({
  name,
  type,
  onChange,
  className = '',
  classNameContainer = '',
  placeholder,
  value,
  list,
  dataList = [],
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
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className={`${className} input`}
        placeholder={placeholder}
        list={list}
      />
      {!!dataList.length && (
        <datalist id={list}>
          {dataList.map((el, index) => (
            <option key={index} value={el.name} />
          ))}
        </datalist>
      )}
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
