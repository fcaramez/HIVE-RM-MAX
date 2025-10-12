import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateRepMax = ({ weight, reps }: { weight: number; reps: number }) => {
  return Number((weight / (1.0278 - 0.0278 * reps)).toFixed(2));
};

export const getTargetReps = ({ repMax, targetReps }: { repMax: number; targetReps: number }) => {
  return Number((repMax * (1.0278 - 0.0278 * targetReps)).toFixed(2));
};
