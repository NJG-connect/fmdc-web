import React from 'react';

interface Props {
  className?: string;
  title: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ className, title, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <p>{title}</p>
    </div>
  );
};

export default Button;
