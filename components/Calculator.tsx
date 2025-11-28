import React, { useState, useCallback, useEffect } from 'react';
import Button from './Button';
import Display from './Display';
import { CalculatorState, ButtonVariant, Operator } from '../types';
import { CALCULATOR_BUTTONS, KEYPAD_MAPPING } from '../constants';

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    currentValue: '0',
    previousValue: null,
    operator: null,
    waitingForNewValue: false,
    history: [],
  });

  const handleDigit = useCallback((digit: string) => {
    setState((prev) => {
      const { currentValue, waitingForNewValue } = prev;
      
      if (waitingForNewValue) {
        return {
          ...prev,
          currentValue: digit,
          waitingForNewValue: false,
        };
      }

      const newValue = currentValue === '0' ? digit : currentValue + digit;
      // Prevent overflow roughly
      if (newValue.length > 9 && !newValue.includes('.')) {
          // Allow simplified entry but cap length visually if needed in display logic
      }
      return {
        ...prev,
        currentValue: newValue.length > 15 ? currentValue : newValue, // Hard cap
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          currentValue: '0.',
          waitingForNewValue: false,
        };
      }
      if (prev.currentValue.includes('.')) return prev;
      
      return {
        ...prev,
        currentValue: prev.currentValue + '.',
      };
    });
  }, []);

  const calculate = (a: number, b: number, op: Operator): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? 0 : a / b;
      default: return b;
    }
  };

  const handleOperator = useCallback((nextOperator: Operator) => {
    setState((prev) => {
      const inputValue = parseFloat(prev.currentValue);

      if (prev.previousValue === null) {
        return {
          ...prev,
          operator: nextOperator,
          previousValue: prev.currentValue,
          waitingForNewValue: true,
        };
      }

      if (prev.operator && !prev.waitingForNewValue) {
        const previousValueNum = parseFloat(prev.previousValue);
        const newValue = calculate(previousValueNum, inputValue, prev.operator);
        
        // Format to avoid long decimals
        const formattedValue = String(Math.round(newValue * 100000000) / 100000000);

        return {
          ...prev,
          currentValue: formattedValue,
          previousValue: formattedValue,
          operator: nextOperator,
          waitingForNewValue: true,
        };
      }

      // If just changing operator without new input
      return {
        ...prev,
        operator: nextOperator,
        waitingForNewValue: true,
      };
    });
  }, []);

  const handleEqual = useCallback(() => {
    setState((prev) => {
      if (!prev.operator || prev.previousValue === null) return prev;

      const current = parseFloat(prev.currentValue);
      const previous = parseFloat(prev.previousValue);
      const result = calculate(previous, current, prev.operator);
      const formattedResult = String(Math.round(result * 100000000) / 100000000);

      return {
        ...prev,
        currentValue: formattedResult,
        previousValue: null,
        operator: null,
        waitingForNewValue: true,
        history: [...prev.history, `${prev.previousValue} ${prev.operator} ${prev.currentValue} = ${formattedResult}`].slice(-5),
      };
    });
  }, []);

  const handleClear = useCallback(() => {
    setState({
      currentValue: '0',
      previousValue: null,
      operator: null,
      waitingForNewValue: false,
      history: [], // Keep history or clear? Let's clear state but history visual could be separate
    });
  }, []);

  const handlePercent = useCallback(() => {
    setState((prev) => {
      const current = parseFloat(prev.currentValue);
      return {
        ...prev,
        currentValue: String(current / 100),
      };
    });
  }, []);

  const handleToggleSign = useCallback(() => {
    setState((prev) => {
      const current = parseFloat(prev.currentValue);
      return {
        ...prev,
        currentValue: String(current * -1),
      };
    });
  }, []);

  const handleButtonPress = useCallback((value: string) => {
    if (/\d/.test(value)) {
      handleDigit(value);
    } else if (value === '.') {
      handleDecimal();
    } else if (value === 'AC') {
      handleClear();
    } else if (value === '+/-') {
      handleToggleSign();
    } else if (value === '%') {
      handlePercent();
    } else if (value === '=') {
      handleEqual();
    } else {
      // It's an operator
      handleOperator(value as Operator);
    }
  }, [handleDigit, handleDecimal, handleClear, handleToggleSign, handlePercent, handleEqual, handleOperator]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (/\d/.test(key)) {
        handleDigit(key);
      } else if (KEYPAD_MAPPING[key]) {
        event.preventDefault(); // Prevent quick search in Firefox etc
        handleButtonPress(KEYPAD_MAPPING[key]);
      } else if (key === 'Enter') {
        event.preventDefault();
        handleEqual();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleButtonPress, handleEqual]);

  return (
    <div className="relative w-full max-w-[360px] bg-black sm:rounded-[3rem] shadow-2xl overflow-hidden border border-gray-800 p-1 sm:p-2">
      <Display 
        value={state.currentValue} 
        previousValue={state.previousValue} 
        operator={state.operator} 
      />
      
      <div className="grid grid-cols-4 gap-2 sm:gap-3 p-2 sm:p-4">
        {CALCULATOR_BUTTONS.flat().map((btn) => (
          <Button
            key={btn.value}
            label={btn.label}
            variant={btn.variant}
            doubleWidth={btn.doubleWidth}
            onClick={() => handleButtonPress(btn.value)}
          />
        ))}
      </div>
      
      {/* Decorative reflection */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50" />
    </div>
  );
};

export default Calculator;