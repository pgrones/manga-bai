import {
  createStyles,
  Group,
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
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
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
    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 36
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
    <Group
      spacing={0}
      style={{ perspective: 1000, overflow: 'hidden', minHeight: 300 }}
      noWrap
      position="center"
    >
      <Overlay
        zIndex={1}
        opacity={0.8}
        color={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[1]
        }
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
  );
};

export default Heading;
