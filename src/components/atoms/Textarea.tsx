import React from 'react';

import './input.css';

interface Props {
  name: string;
  onChange: (value: string) => void;
  className?: string;
  classNameContainer?: string;
  placeholder?: string;
  value?: string | number | null;
}

const Textarea: React.FC<Props> = ({
  name,
  onChange,
  className = '',
  classNameContainer = '',
  placeholder,
  value,
}) => {
  return (
    <div className={`${classNameContainer} container textarea-container`}>
      <p className="title">{name}</p>
      <textarea
        value={value || undefined}
        onChange={e => onChange(e.target.value)}
        className={`${className} input textarea-input`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
