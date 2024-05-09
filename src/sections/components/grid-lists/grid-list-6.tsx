import type { FC } from "react";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsHorizontal";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

interface Contact {
  id: string;
  avatar: string;
  commonContacts: number;
  name: string;
  status: string;
  date: string;
}

const contacts: Contact[] = [
  {
    id: "5e887ac47eed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    commonContacts: 10,
    name: "Carson Darrin",
    status: "Rejected",
    date: "23/04/2023",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    avatar: "/assets/avatars/avatar-fran-perez.png",
    commonContacts: 8,
    name: "Fran Perez",
    status: "Pending",
    date: "23/04/2023",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    commonContacts: 5,
    name: "Miron Vitold",
    status: "Not Connected",
    date: "23/04/2023",
  },
];

export const GridList6: FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
        p: 3,
      }}
    >
      <Stack spacing={3}>
        {contacts.map((contact) => (
          <Card sx={{ cursor: "pointer" }} key={contact.id}>
            <Stack
              alignItems="center"
              direction="row"
              sx={{ p: 2 }}
              spacing={2}
            >
              <Avatar
                src={contact.avatar}
                sx={{
                  height: 60,
                  width: 60,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography color="text.primary" variant="h4">
                  {contact.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  {/* Date :{moment(contact.date)} */}
                </Typography>
              </Box>
              <IconButton>
                <SvgIcon>
                  <DotsHorizontalIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};
