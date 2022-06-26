import { Text } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

const ExternalLink: FC<PropsWithChildren<{ href: string }>> = props => {
  return (
    <Text
      component="a"
      target="_blank"
      referrerPolicy="no-referrer"
      size="sm"
      {...props}
    >
      {props.children}
    </Text>
  );
};

export default ExternalLink;
