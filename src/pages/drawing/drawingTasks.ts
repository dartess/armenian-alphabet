import type { TaskUnit } from '@/types/model';

export type DrawingKey = `drawing-${TaskUnit}-${TaskUnit}`;

interface TaskDrawing {
  from: TaskUnit;
  to: TaskUnit;
}

// todo rewrite on satisfies

export const drawingTypes: Partial<Record<DrawingKey, TaskDrawing>> = {
  'drawing-meta-lowercase': {
    from: 'meta',
    to: 'lowercase',
  },
  'drawing-meta-uppercase': {
    from: 'meta',
    to: 'uppercase',
  },
  'drawing-lowercase-uppercase': {
    from: 'lowercase',
    to: 'uppercase',
  },
  'drawing-uppercase-lowercase': {
    from: 'uppercase',
    to: 'lowercase',
  },
};
