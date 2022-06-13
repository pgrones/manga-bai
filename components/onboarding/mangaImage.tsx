import { useQuery } from '@apollo/client';
import { Overlay, useMantineTheme } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import Image from 'next/image';
import popularMangaQuery, {
  PopularMangaQueryData
} from '../../apollo/queries/popularManga';
import { getCovers } from '../../lib/helper/onboardingHelper';
import { getBorderRadius } from '../../lib/helper/radius';
import { useOnboarding } from '../../lib/hooks/provider/onboardingProvider';

const MangaImage = () => {
  const { mediaData } = useOnboarding();
  const theme = useMantineTheme();
  useScrollLock(true, { disableBodyPadding: true });

  const { data } = useQuery<PopularMangaQueryData>(popularMangaQuery, {
    skip:
      (mediaData?.MediaListCollection.lists[0]?.entries?.length ?? 0) +
        (mediaData?.MediaListCollection.lists[1]?.entries?.length ?? 0) >=
      4
  });

  const mangaCovers = getCovers(data ?? mediaData);

  return mangaCovers === undefined ? null : (
    <div
      style={{
        transform: 'rotate(-70deg)',
        position: 'fixed',
        right: 740,
        bottom: 0
      }}
    >
      {mangaCovers.map((m, i) => (
        <div
          key={m.id}
          style={{
            position: 'absolute',
            height: 430,
            width: 300,
            zIndex: i,
            transformOrigin: 'bottom center',
            ...m.style
          }}
        >
          <Overlay
            zIndex={5}
            opacity={0.85}
            color={theme.other.getThemeBg(theme)}
          />
          <Image
            src={m.coverImage}
            alt=""
            layout="fill"
            style={getBorderRadius(theme)}
          />
        </div>
      ))}
    </div>
  );
};

export default MangaImage;
