import { Button, Card } from '@mantine/core';
import { useModals } from '@mantine/modals';
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
  const { openModal, closeModal } = useModals();

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
            <Header {...props.media} close={() => closeModal(id)} />
          </Card.Section>
          <Form {...props} close={() => closeModal(id)} />
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
