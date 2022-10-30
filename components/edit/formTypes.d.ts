import { IEntryContext } from '../../lib/hooks/provider/entryProviderTypes';
import { IMediaContext } from '../../lib/hooks/provider/mediaProviderTypes';
import { IUserData } from '../../lib/hooks/provider/userProviderTypes';

export interface FormProps extends IEntryContext, IMediaContext, IUserData {
  close: () => void;
}
