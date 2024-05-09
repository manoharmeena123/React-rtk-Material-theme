import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { File, FileDropzone } from 'src/components/file-dropzone';

interface FileUploaderProps {
  onClose?: () => void;
  open?: boolean;
}

export const FileUploader: FC<FileUploaderProps> = (props) => {
  const { onClose, open = false } = props;
  const [files, setFiles] = useState<File[]>([]);

  useEffect(
    () => {
      setFiles([]);
    },
    [open]
  );

  const handleDrop = useCallback(
    (newFiles: File[]): void => {
      setFiles((prevFiles) => {
        return [...prevFiles, ...newFiles];
      });
    },
    []
  );

  const handleRemove = useCallback(
    (file: File): void => {
      setFiles((prevFiles) => {
        return prevFiles.filter((_file) => _file.path !== file.path);
      });
    },
    []
  );

  const handleRemoveAll = useCallback(
    (): void => {
      setFiles([]);
    },
    []
  );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          py: 2
        }}
      >
        <Typography variant="h6">
          Upload Files
        </Typography>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <FileDropzone
          accept={{ '*/*': [] }}
          caption="Max file size is 3 MB"
          files={files}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
          onUpload={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

FileUploader.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
