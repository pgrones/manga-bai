import { Container, MediaQuery, Stepper } from '@mantine/core';
import { useRef } from 'react';
import { WAITING } from '../../lib/helper/constants';
import { useOnboarding } from '../../lib/hooks/provider/onboardingProvider';
import CreateCustomListStep from './createCustomListStep';
import CustomizeStep from './customizeStep';
import MangaImage from './mangaImage';

const Steps: React.FC = () => {
  const { step, loading } = useOnboarding();
  const scrollableRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Container
        pt="xl"
        p={0}
        sx={theme => ({
          height: `calc(100vh - var(--mantine-header-height) - ${
            theme.spacing.md * 2
          }px)`,
          overflow: 'auto'
        })}
        ref={scrollableRef}
      >
        <Stepper
          active={step}
          breakpoint="sm"
          styles={{ root: { position: 'relative', zIndex: 10 } }}
        >
          <Stepper.Step label="Retrieving data" description="from AniList" />
          <Stepper.Step
            label="Creating custom list"
            description={`"${WAITING}"`}
            loading={loading && step === 1}
          >
            <CreateCustomListStep scrollableRef={scrollableRef} />
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
      <MediaQuery smallerThan="xl" styles={{ display: 'none' }}>
        <div>
          <MangaImage />
        </div>
      </MediaQuery>
    </>
  );
};

export default Steps;
