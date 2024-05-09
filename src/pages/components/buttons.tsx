import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as ComponentsLayout } from 'src/layouts/components';
import { Previewer } from 'src/sections/components/previewer';
import { Buttons1 } from 'src/sections/components/buttons/buttons-1';
import { Buttons2 } from 'src/sections/components/buttons/buttons-2';
import { Buttons3 } from 'src/sections/components/buttons/buttons-3';

const components: { element: JSX.Element; title: string; }[] = [
  {
    element: <Buttons1 />,
    title: 'Simple buttons'
  },
  {
    element: <Buttons2 />,
    title: 'Buttons with text and icon'
  },
  {
    element: <Buttons3 />,
    title: 'Button groups'
  }
];

const Page = () => {
  usePageView();

  return (
    <>
      <ComponentsLayout title="Buttons">
        <Seo title="Components: Buttons" />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={8}>
              {components.map((component) => (
                <Previewer
                  key={component.title}
                  title={component.title}
                >
                  {component.element}
                </Previewer>
              ))}
            </Stack>
          </Container>
        </Box>
      </ComponentsLayout>
    </>
  );
};

export default Page;
