import { Text } from '@mantine/core';
import React from 'react';
import { useUser } from '../../lib/hooks/provider/userProvider';

const AmazonLink: React.FC<{ title: string; href: string; link?: boolean }> = ({
  title,
  href,
  link
}) => {
  const { aniListUser } = useUser();
  return (
    // <Stack spacing={2} align="flex-start">
    <Text
      component="a"
      variant={link ? 'link' : 'text'}
      title="affiliate link"
      size="sm"
      href={aniListUser?.id === 120929 ? 'https://www.amazon.co.jp' : href}
      target="_blank"
      referrerPolicy="no-referrer"
      style={{ whiteSpace: link ? 'nowrap' : undefined }}
      //   style={{ lineHeight: 1 }}
    >
      {title}
    </Text>
    //   <Text
    //     size="xs"
    //     color="dimmed"
    //     style={{ lineHeight: 1, alignSelf: 'flex-end' }}
    //   >
    //     (affiliate link)
    //   </Text>
    // </Stack>
  );
};

export default AmazonLink;
