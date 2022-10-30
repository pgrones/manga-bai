export interface IFirebaseValues {
  notes?: string;
  preordered?: number;
  removed?: boolean;
  hasNewVolume?: boolean | null;
  lastVolumeCheck?: number;
  preorderLanguage?: 'english' | 'native';
}
