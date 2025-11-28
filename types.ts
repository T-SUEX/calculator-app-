export enum ButtonVariant {
  PRIMARY = 'PRIMARY',     // Numbers
  SECONDARY = 'SECONDARY', // Top row functions (AC, +/-, %)
  ACCENT = 'ACCENT',       // Operators (+, -, *, /)
}

export type Operator = '+' | '-' | '×' | '÷' | null;

export interface CalculatorState {
  currentValue: string;
  previousValue: string | null;
  operator: Operator;
  waitingForNewValue: boolean;
  history: string[];
}

export interface ButtonConfig {
  label: string;
  value: string;
  variant: ButtonVariant;
  doubleWidth?: boolean;
}