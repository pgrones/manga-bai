import {
  createStyles,
  Group,
  MediaQuery,
  Overlay,
  Title,
  useMantineTheme
} from '@mantine/core';
import Image from 'next/image';
import { getBorderRadius } from '../../lib/helper/radius';

const useStyles = createStyles(theme => ({
  image: {
    aspectRatio: '200 / 300',
    height: 300,
    width: 200,
    position: 'relative',
    transformStyle: 'preserve-3d',
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 260 + 'px !important',
      width: 173 + 'px !important'
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 220 + 'px !important',
      width: 147 + 'px !important'
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 180 + 'px !important',
      width: 120 + 'px !important'
    }
  },
  heading: {
    position: 'absolute',
    zIndex: 2,
    fontSize: 24,
    lineHeight: 1.5,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 28
    },
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 34
    },
    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 40
    }
  }
}));

const Heading: React.FC<{
  manga: {
    id: number;
    title: string;
    src: string;
    transform: string;
    zIndex: number;
  }[];
}> = ({ manga }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <MediaQuery smallerThan="lg" styles={{ minHeight: 180 + 'px !important' }}>
      <Group
        spacing={0}
        style={{ perspective: 1100, overflow: 'hidden', minHeight: 300 }}
        noWrap
        position="center"
      >
        <Overlay
          zIndex={1}
          opacity={0.8}
          color={theme.other.getThemeBg(theme)}
          sx={theme => ({
            left: -theme.spacing.md * 2,
            right: -theme.spacing.md * 2
          })}
        />
        <Title align="center" className={classes.heading}>
          Track your preordered, bought, and owned manga and light novels
        </Title>
        {manga?.map((m, i) => (
          <div
            className={classes.image}
            style={{ transform: m.transform, zIndex: m.zIndex }}
            key={m.id}
          >
            <Image
              layout="fill"
              objectFit="cover"
              src={m.src}
              alt={m.title}
              style={getBorderRadius(theme)}
              priority={Math.floor(manga.length / 2) === i}
              sizes="200px"
            />
          </div>
        ))}
      </Group>
    </MediaQuery>
  );
};

export default Heading;
