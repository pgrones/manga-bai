import { Container, Stepper } from '@mantine/core';
import { WAITING } from '../../lib/helper/constants';
import { useOnboarding } from '../../lib/hooks/provider/onboardingProvider';
import CreateCustomListStep from './createCustomListStep';
import CustomizeStep from './customizeStep';
import RetrieveDataStep from './retrieveDataStep';

const Steps: React.FC = () => {
  const { step, loading } = useOnboarding();

  return (
    <Container pt="xl">
      <Stepper active={step} breakpoint="sm">
        <Stepper.Step
          label="Retrieving data"
          description="from AniList"
          loading={loading && step === 0}
        >
          <RetrieveDataStep />
        </Stepper.Step>
        <Stepper.Step
          label="Creating custom list"
          description={`"${WAITING}"`}
          loading={loading && step === 1}
        >
          <CreateCustomListStep />
        </Stepper.Step>
        <Stepper.Step
          label="Customizing the site"
          description="Colors and more!"
          loading={loading && step === 2}
        >
          <CustomizeStep />
        </Stepper.Step>
      </Stepper>
    </Container>
  );
};

export default Steps;
