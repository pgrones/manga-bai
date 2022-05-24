import { Button, Card, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { MediaList } from '../../apollo/queries/mediaQuery';
import Form from './form';
import Header from './header';

const EditModal: React.FC<MediaList> = props => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Button variant="light" onClick={toggle}>
        Edit
      </Button>
      <Modal
        opened={opened}
        onClose={toggle}
        centered
        withCloseButton={false}
        padding={0}
        size="xl"
      >
        <Card
          sx={theme => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
          })}
        >
          <Card.Section
            sx={theme => ({
              backgroundColor: theme.colors.dark[7],
              position: 'relative'
            })}
          >
            <Header {...props.media} />
          </Card.Section>
          <Form {...props} />
        </Card>
      </Modal>
    </>
  );
};

export default EditModal;
