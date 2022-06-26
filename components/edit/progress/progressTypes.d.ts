export interface ProgressProps {
  text: string;
  progress: number;
  buttonVisible: boolean;
  updateProgress: (
    progress: number,
    originalProgress: number
  ) => void | Promise<void>;
}
