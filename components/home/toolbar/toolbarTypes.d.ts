import { RefAttributes } from 'react';

export interface ToolbarProps extends RefAttributes<HTMLDivElement> {
  title: string;
  recalculate: () => void;
}
