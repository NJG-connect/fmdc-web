import React from 'react';

import './checkBox.css';

interface Props {
  value: boolean | null;
  name: string;
  onChange: (value: boolean) => void;
  classNameContainer?: string;
  className?: string;
}

export default function CheckBox({
  value,
  name,
  onChange,
  classNameContainer = '',
  className = '',
}: Props) {
  return (
    <div className={`${classNameContainer} checkBox-container`}>
      <input
        type="checkbox"
        name={name}
        checked={value || false}
        onChange={event => {
          onChange(event.target.checked);
        }}
        className={`${className} checkBox-input`}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}
