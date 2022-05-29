import { Button, Card, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { MediaList } from '../../apollo/queries/mediaQuery';
import { UpdatedValues } from '../home/manga';
import Form from './form';
import Header from './header';

const EditModal: React.FC<
  MediaList & {
    updateData: (values: UpdatedValues) => void;
  }
> = props => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button size="xs" variant="light" onClick={open}>
        Edit
      </Button>
      <Modal
        opened={opened}
        onClose={close}
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
            <Header {...props.media} close={close} />
          </Card.Section>
          <Form {...props} close={close} />
        </Card>
      </Modal>
    </>
  );
};

export default EditModal;
