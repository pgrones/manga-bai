import { Card } from '@mantine/core';
import { useModals } from '@mantine/modals';
import {
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactElement
} from 'react';
import { useEntry } from '../../lib/hooks/provider/entryProvider';
import { useMedia } from '../../lib/hooks/provider/mediaProvider';
import { useUser } from '../../lib/hooks/provider/userProvider';
import Form from './form';
import Header from './header';

const EditModal: FC<PropsWithChildren<unknown>> = ({ children = null }) => {
  const { openModal, closeModal } = useModals();
  const entry = useEntry();
  const media = useMedia();
  const { userData } = useUser();

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
          <Form
            {...entry}
            {...media}
            {...userData!}
            close={() => closeModal(id)}
          />
        </Card>
      )
    });
  };

  return (
    (isValidElement(children) &&
      cloneElement(children as ReactElement<any>, {
        onClick: openEditModal
      })) ||
    null
  );
};

export default EditModal;
