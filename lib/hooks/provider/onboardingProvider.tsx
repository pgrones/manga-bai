import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState
} from 'react';
import { setUserData } from '../../firebase/db';
import { IOnboardingContext, OnboardingProps } from './onboardingProviderTypes';
import { useUser } from './userProvider';

const OnboardingContext = createContext<IOnboardingContext>(
  {} as IOnboardingContext
);

export const useOnboarding = () => useContext(OnboardingContext);

const OnboardingProvider: FC<PropsWithChildren<OnboardingProps>> = props => {
  const { children, mediaData, customLists } = props;
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
        done
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
