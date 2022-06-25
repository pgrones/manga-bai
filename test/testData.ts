import test from './test.json';

export const testData = (test as any).data.MediaListCollection.lists
  .reduce((p: any, c: any) => [...p, ...c.entries], [])
  .map((p: any) => ({ ...p, status: 'CURRENT' }));
