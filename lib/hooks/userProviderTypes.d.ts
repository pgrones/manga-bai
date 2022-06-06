import { User } from 'firebase/auth';
import { AniListUser } from '../../apollo/queries/userQuery';
import { IUserData } from '../types/user';

export interface IUserContext {
  fullyAuthenticated: boolean | 'loading';
  aniListUser: AniListUser | null;
  firebaseUser: User | null;
  userData: IUserData | null;
  signOut: () => void;
}
