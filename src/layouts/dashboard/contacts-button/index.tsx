import type { FC } from 'react';
import { subHours, subMinutes } from 'date-fns';
import Users03Icon from '@untitled-ui/icons-react/build/esm/Users03';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';

import { usePopover } from 'src/hooks/use-popover';

import { ContactsPopover } from './contacts-popover';

const now = new Date();

interface Contact {
  id: string;
  avatar: string;
  isActive: boolean;
  lastActivity?: number;
  name: string;
}

const useContacts = (): Contact[] => {
  return [
    {
      id: '5e8891ab188cd2855e6029b7',
      avatar: '/assets/avatars/avatar-alcides-antonio.png',
      isActive: true,
      lastActivity: now.getTime(),
      name: 'Alcides Antonio'
    },
    {
      id: '5e887a62195cc5aef7e8ca5d',
      avatar: '/assets/avatars/avatar-marcus-finn.png',
      isActive: false,
      lastActivity: subHours(now, 2).getTime(),
      name: 'Marcus Finn'
    },
    {
      id: '5e887ac47eed253091be10cb',
      avatar: '/assets/avatars/avatar-carson-darrin.png',
      isActive: false,
      lastActivity: subMinutes(now, 15).getTime(),
      name: 'Carson Darrin'
    },
    {
      id: '5e887b209c28ac3dd97f6db5',
      avatar: '/assets/avatars/avatar-fran-perez.png',
      isActive: true,
      lastActivity: now.getTime(),
      name: 'Fran Perez'
    },
    {
      id: '5e887b7602bdbc4dbb234b27',
      avatar: '/assets/avatars/avatar-jie-yan-song.png',
      isActive: true,
      lastActivity: now.getTime(),
      name: 'Jie Yan Song'
    }
  ];
};

export const ContactsButton: FC = () => {
  const popover = usePopover<HTMLButtonElement>();
  const contacts = useContacts();

  return (
    <>
      <Tooltip title="Contacts">
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
        >
          <SvgIcon>
            <Users03Icon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <ContactsPopover
        anchorEl={popover.anchorRef.current}
        contacts={contacts}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
