const highlightPaths: Record<'row' | 'column', Record<string, number[]>> = {
  column: {
    red: [1, 7, 8, 9, 10, 11] as number[],
    green: [4, 5, 7, 10, 13, 16] as number[],
    blue: [1, 4, 7, 10, 12, 13] as number[],
    yellow: [6, 7, 8, 9, 10, 16] as number[],
  },
  row: {
    red: [1, 7, 8, 9, 10, 11] as number[],
    green: [4, 5, 7, 10, 13, 16] as number[],
    blue: [1, 4, 7, 10, 12, 13] as number[],
    yellow: [6, 7, 8, 9, 10, 16] as number[],
  },
};


const starPositions: Record<'row' | 'column', Record<string, number[]>> = {
  column: {
    red: [1, 14] as number[],
    green: [5, 6] as number[],
    yellow: [3, 16] as number[],
    blue: [11, 12] as number[],
  },
  row: {
    red: [1, 14] as number[],
    green: [6, 7] as number[],
    yellow: [3, 16] as number[],
    blue: [12, 13] as number[],
  },
};

const arrowPositions: Record<'row' | 'column', Record<string, number[]>> = {
  column: {
    red: [1] as number[],
    green: [1] as number[],
    yellow: [5] as number[],
    blue: [16] as number[],
  },
  row: {
    red: [6] as number[],
    green: [0] as number[],
    yellow: [11] as number[],
    blue: [1] as number[],
  },
};


const colorClasses = {
  red: 'bg-red-600',
  green: 'bg-green-600',
  blue: 'bg-blue-600',
  yellow: 'bg-yellow-400',
} as const;


export {arrowPositions,colorClasses,highlightPaths,starPositions}
