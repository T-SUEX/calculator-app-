import { ButtonConfig, ButtonVariant } from './types';

export const CALCULATOR_BUTTONS: ButtonConfig[][] = [
  [
    { label: 'AC', value: 'AC', variant: ButtonVariant.SECONDARY },
    { label: '+/-', value: '+/-', variant: ButtonVariant.SECONDARY },
    { label: '%', value: '%', variant: ButtonVariant.SECONDARY },
    { label: '÷', value: '÷', variant: ButtonVariant.ACCENT },
  ],
  [
    { label: '7', value: '7', variant: ButtonVariant.PRIMARY },
    { label: '8', value: '8', variant: ButtonVariant.PRIMARY },
    { label: '9', value: '9', variant: ButtonVariant.PRIMARY },
    { label: '×', value: '×', variant: ButtonVariant.ACCENT },
  ],
  [
    { label: '4', value: '4', variant: ButtonVariant.PRIMARY },
    { label: '5', value: '5', variant: ButtonVariant.PRIMARY },
    { label: '6', value: '6', variant: ButtonVariant.PRIMARY },
    { label: '-', value: '-', variant: ButtonVariant.ACCENT },
  ],
  [
    { label: '1', value: '1', variant: ButtonVariant.PRIMARY },
    { label: '2', value: '2', variant: ButtonVariant.PRIMARY },
    { label: '3', value: '3', variant: ButtonVariant.PRIMARY },
    { label: '+', value: '+', variant: ButtonVariant.ACCENT },
  ],
  [
    { label: '0', value: '0', variant: ButtonVariant.PRIMARY, doubleWidth: true },
    { label: '.', value: '.', variant: ButtonVariant.PRIMARY },
    { label: '=', value: '=', variant: ButtonVariant.ACCENT },
  ],
];

export const KEYPAD_MAPPING: Record<string, string> = {
  'Enter': '=',
  'Escape': 'AC',
  'Backspace': 'AC', // Or separate backspace logic if preferred, mapping to AC for simplicity here
  '/': '÷',
  '*': '×',
  '-': '-',
  '+': '+',
  '.': '.',
  ',': '.',
};