import React from 'react';
import './cardItem.css';

interface Props {
  children?: React.ReactNode | JSX.Element | null;
  onClick?: () => void;
  className?: string
}

export default function CardItem({ children, onClick, className="" }: Props) {
  return (
    <div className={`carditem-container ${className}`} onClick={onClick} >
      {children}
    </div>
  );
}
