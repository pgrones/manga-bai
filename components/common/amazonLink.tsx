import { Text } from '@mantine/core';
import React from 'react';

const AmazonLink: React.FC<{ title: string; href: string; link?: boolean }> = ({
  title,
  href,
  link
}) => {
  return (
    // <Stack spacing={2} align="flex-start">
    <Text
      component="a"
      variant={link ? 'link' : 'text'}
      title="affiliate link"
      size="sm"
      href={href}
      target="_blank"
      referrerPolicy="no-referrer"
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
