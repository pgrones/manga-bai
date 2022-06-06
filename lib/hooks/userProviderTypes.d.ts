import { User } from 'firebase/auth';
import { IUserData } from '../types/user';

export interface IUserContext {
  fullyAuthenticated: boolean | 'loading';
  aniListUser: AnilistUser | null;
  firebaseUser: User | null;
  userData: IUserData | null;
  signOut: () => void;
}
