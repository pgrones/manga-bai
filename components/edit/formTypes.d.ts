import { IEntryContext } from '../../lib/hooks/provider/entryProviderTypes';
import { IMediaContext } from '../../lib/hooks/provider/mediaProviderTypes';

export interface FormProps extends IEntryContext, IMediaContext {
  close: () => void;
}
