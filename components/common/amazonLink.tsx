import { Text } from '@mantine/core';
import { FC } from 'react';
import { useUser } from '../../lib/hooks/provider/userProvider';
import { AmazonLinkProps } from './amazonLinkTypes';

const AmazonLink: FC<AmazonLinkProps> = ({ title, href, link }) => {
  const { aniListUser } = useUser();

  return (
    <Text
      component="a"
      variant={link ? 'link' : 'text'}
      title="affiliate link"
      size="sm"
      // I'm not allowed to use my own affiliate link
      href={aniListUser?.id === 120929 ? 'https://www.amazon.co.jp' : href}
      target="_blank"
      referrerPolicy="no-referrer"
      style={{ whiteSpace: link ? 'nowrap' : undefined }}
    >
      {title}
    </Text>
  );
};

export default AmazonLink;
