import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string; 
  onClick: () => void; 
  type?: 'button' | 'submit' | 'reset'; 
  variant?: 'primary' | 'secondary' | 'danger'; 
  disabled?: boolean; 
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;