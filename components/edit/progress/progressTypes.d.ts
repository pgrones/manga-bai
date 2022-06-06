export interface ProgressProps {
  text: string;
  progress: number;
  buttonVisible: boolean;
  updateProgress: (progress: number) => void | Promise<void>;
}
