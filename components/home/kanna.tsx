import { MediaQuery } from '@mantine/core';
import Image from 'next/image';
import kanna from '../../public/kanna.png';

const Kanna = () => {
  return (
    <MediaQuery smallerThan="xl" styles={{ display: 'none' }}>
      <div className="kanna">
        {[1, 10, 20].includes(new Date().getDate()) && (
          <Image src={kanna} alt="" width={80} height={68} />
        )}
      </div>
    </MediaQuery>
  );
};

export default Kanna;
