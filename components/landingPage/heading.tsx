import {
  createStyles,
  Group,
  Overlay,
  Title,
  useMantineTheme,
  Image
} from '@mantine/core';

const useStyles = createStyles(theme => ({
  image: {
    aspectRatio: '200 / 300',
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 180 + 'px !important'
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
      style={{ perspective: 1000, overflow: 'hidden' }}
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
      {manga?.map(m => (
        <Image
          key={m.id}
          src={m.src}
          alt={m.title}
          radius="sm"
          height={300}
          width="auto"
          style={{
            transformStyle: 'preserve-3d',
            transform: m.transform,
            zIndex: m.zIndex
          }}
          classNames={{ image: classes.image }}
        />
      ))}
    </Group>
  );
};

export default Heading;
