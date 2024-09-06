import { createContext } from 'react';
import { ScrollService } from '../service/ScrollService';

export const ReactScrollContext = createContext<
  | {
      scroll: ScrollService;
    }
  | undefined
>(undefined);
