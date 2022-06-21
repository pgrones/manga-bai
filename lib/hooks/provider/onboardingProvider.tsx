import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from 'react';
import { MediaListQueryData } from '../../../apollo/queries/mediaListQuery';
import { setUserData } from '../../firebase/db';
import { IMediaLists } from '../../types/entry';
import { IOnboardingContext } from './onboardingProviderTypes';
import { useUser } from './userProvider';

const OnboardingContext = createContext<IOnboardingContext>(
  {} as IOnboardingContext
);

export const useOnboarding = () => useContext(OnboardingContext);

const OnboardingProvider: React.FC<
  PropsWithChildren<{
    setMediaLists: React.Dispatch<
      React.SetStateAction<IMediaLists | undefined>
    >;
    mediaData: MediaListQueryData | undefined;
    customLists: string[] | undefined;
  }>
> = ({ children, setMediaLists, mediaData, customLists }) => {
  const { firebaseUser } = useUser();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);

  const done = () => setUserData(firebaseUser!.uid, { onboardingDone: true });

  return (
    <OnboardingContext.Provider
      value={{
        step,
        nextStep,
        loading,
        setLoading,
        mediaData,
        customLists,
        setMediaLists,
        done
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
