import { Button, Card } from '@mantine/core';
import { useModals } from '@mantine/modals';
import React from 'react';
import { useEntry } from '../../lib/hooks/entryProvider';
import { useMedia } from '../../lib/hooks/mediaProvider';
import Form from './form';
import Header from './header';

const EditModal: React.FC = () => {
  const { openModal, closeModal } = useModals();
  const entry = useEntry();
  const media = useMedia();

  const openEditModal = () => {
    const id = openModal({
      centered: true,
      withCloseButton: false,
      padding: 0,
      size: 'xl',
      children: (
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
            <Header {...entry.aniListData.media} close={() => closeModal(id)} />
          </Card.Section>
          <Form {...entry} {...media} close={() => closeModal(id)} />
        </Card>
      )
    });
  };

  return (
    <Button size="xs" variant="light" onClick={openEditModal}>
      Edit
    </Button>
  );
};

export default EditModal;
