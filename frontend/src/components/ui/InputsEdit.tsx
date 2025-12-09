// src/components/ui/InputGroup.tsx
import React from 'react';
import './UiStyles.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  isTextArea?: boolean;
}

export const InputGroup: React.FC<InputProps> = ({ 
  label, helperText, isTextArea = false, ...props // <--- IMPORTANTE: Recibir ...props
}) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      
      {isTextArea ? (
        <textarea 
          className="input-field textarea-field" 
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>} // <--- Pasarlas aquí
        />
      ) : (
        <input 
          className="input-field" 
          {...props as React.InputHTMLAttributes<HTMLInputElement>} // <--- Y aquí
        />
      )}
      
      {helperText && <span className="input-helper">{helperText}</span>}
    </div>
  );
};