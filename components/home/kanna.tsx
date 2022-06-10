import kanna from '../../public/kanna.png';
import Image from 'next/image';
import { MediaQuery } from '@mantine/core';

const Kanna = () => {
  return (
    <MediaQuery smallerThan="xl" styles={{ display: 'none' }}>
      {[1, 10, 20].includes(new Date().getDate()) && (
        <div className="kanna">
          <Image src={kanna} alt="" width={80} height={68} />
        </div>
      )}
    </MediaQuery>
  );
};

export default Kanna;
