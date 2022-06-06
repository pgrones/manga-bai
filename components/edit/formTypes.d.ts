import { IEntryContext } from '../../lib/hooks/entryProviderTypes';

export interface FormProps extends IEntryContext {
  close: () => void;
}
