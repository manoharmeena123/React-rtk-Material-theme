import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { fileManagerApi } from 'src/api/file-manager';
import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { FileUploader } from 'src/sections/dashboard/file-manager/file-uploader';
import { ItemDrawer } from 'src/sections/dashboard/file-manager/item-drawer';
import { ItemList } from 'src/sections/dashboard/file-manager/item-list';
import { ItemSearch } from 'src/sections/dashboard/file-manager/item-search';
import { StorageStats } from 'src/sections/dashboard/file-manager/storage-stats';
import type { Item } from 'src/types/file-manager';

type View = 'grid' | 'list';

interface Filters {
  query?: string;
}

type SortDir = 'asc' | 'desc';

interface ItemsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

const useItemsSearch = () => {
  const [state, setState] = useState<ItemsSearchState>({
    filters: {
      query: undefined
    },
    page: 0,
    rowsPerPage: 9,
    sortBy: 'createdAt',
    sortDir: 'desc'
  });

  const handleFiltersChange = useCallback(
    (filters: Filters): void => {
      setState((prevState) => ({
        ...prevState,
        filters
      }));
    },
    []
  );

  const handleSortChange = useCallback(
    (sortDir: SortDir): void => {
      setState((prevState) => ({
        ...prevState,
        sortDir
      }));
    },
    []
  );

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setState((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10)
      }));
    },
    []
  );

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state
  };
};

interface ItemsStoreState {
  items: Item[],
  itemsCount: number;
}

const useItemsStore = (searchState: ItemsSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ItemsStoreState>({
    items: [],
    itemsCount: 0
  });

  const handleItemsGet = useCallback(
    async () => {
      try {
        const response = await fileManagerApi.getItems(searchState);

        if (isMounted()) {
          setState({
            items: response.data,
            itemsCount: response.count
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    [searchState, isMounted]
  );

  useEffect(
    () => {
      handleItemsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  const handleDelete = useCallback(
    (itemId: string): void => {
      // api call should be made here, then get the list again
      setState((prevState) => {
        return {
          ...prevState,
          items: prevState.items.filter((item) => item.id !== itemId)
        };
      });
    },
    []
  );

  const handleFavorite = useCallback(
    (itemId: string, value: boolean): void => {
      setState((prevState) => {
        return {
          ...prevState,
          items: prevState.items.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                isFavorite: value
              };
            }

            return item;
          })
        };
      });
    },
    []
  );

  return {
    handleDelete,
    handleFavorite,
    ...state
  };
};

const useCurrentItem = (items: Item[], itemId?: string): Item | undefined => {
  return useMemo(
    (): Item | undefined => {
      if (!itemId) {
        return undefined;
      }

      return items.find((item) => item.id === itemId);
    },
    [items, itemId]
  );
};

const Page = () => {
  const settings = useSettings();
  const itemsSearch = useItemsSearch();
  const itemsStore = useItemsStore(itemsSearch.state);
  const [view, setView] = useState<View>('grid');
  const uploadDialog = useDialog();
  const detailsDialog = useDialog<string>();
  const currentItem = useCurrentItem(itemsStore.items, detailsDialog.data);

  usePageView();

  const handleDelete = useCallback(
    (itemId: string): void => {
      // This can be triggered from multiple places, ensure drawer is closed.
      detailsDialog.handleClose();
      itemsStore.handleDelete(itemId);
    },
    [detailsDialog, itemsStore]
  );

  return (
    <>
      <Seo title="Dashboard: File Manager" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    File Manager
                  </Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    onClick={uploadDialog.handleOpen}
                    startIcon={(
                      <SvgIcon>
                        <Upload01Icon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Upload
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={8}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4
                }}
              >
                <ItemSearch
                  onFiltersChange={itemsSearch.handleFiltersChange}
                  onSortChange={itemsSearch.handleSortChange}
                  onViewChange={setView}
                  sortBy={itemsSearch.state.sortBy}
                  sortDir={itemsSearch.state.sortDir}
                  view={view}
                />
                <ItemList
                  count={itemsStore.itemsCount}
                  items={itemsStore.items}
                  onDelete={handleDelete}
                  onFavorite={itemsStore.handleFavorite}
                  onOpen={detailsDialog.handleOpen}
                  onPageChange={itemsSearch.handlePageChange}
                  onRowsPerPageChange={itemsSearch.handleRowsPerPageChange}
                  page={itemsSearch.state.page}
                  rowsPerPage={itemsSearch.state.rowsPerPage}
                  view={view}
                />
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <StorageStats />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ItemDrawer
        item={currentItem}
        onClose={detailsDialog.handleClose}
        onDelete={handleDelete}
        onFavorite={itemsStore.handleFavorite}
        open={detailsDialog.open}
      />
      <FileUploader
        onClose={uploadDialog.handleClose}
        open={uploadDialog.open}
      />
    </>
  );
};

export default Page;
