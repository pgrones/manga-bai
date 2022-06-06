import { IEntryContext } from '../../lib/hooks/entryProviderTypes';
import { IMediaContext } from '../../lib/hooks/mediaProviderTypes';

export interface FormProps extends IEntryContext, IMediaContext {
  close: () => void;
}
