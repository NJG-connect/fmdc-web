import React from 'react';

import './button.css';

interface Props {
  className?: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  withoutStyle?: boolean;
}

const Button: React.FC<Props> = ({
  className = '',
  title,
  onClick,
  disabled = false,
  withoutStyle = false,
}) => {
  return (
    <div
      className={`${withoutStyle ? '' : 'button'} ${className} ${
        disabled && 'disabled'
      }`}
      onClick={() => !disabled && onClick()}>
      <p>{title}</p>
    </div>
  );
};

export default Button;
