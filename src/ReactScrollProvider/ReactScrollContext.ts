import { createContext } from 'react';
import { ScrollService } from './ScrollService';

export const ReactScrollContext = createContext<ScrollService | undefined>(
  undefined
);
