import React, { ElementRef } from 'react';
import { Uploader } from 'rsuite';

export type UploaderProps = {
  uploaderRef?: ElementRef<typeof Uploader>;
  action: string;
  onUploadSuccess?: (attachment: any) => void;
};

const styles = {
  lineHeight: '100px',
};

export default ({ action, uploaderRef, onUploadSuccess }: UploaderProps) => {
  return (
    <Uploader
      action={action}
      draggable
      autoUpload={false}
      ref={uploaderRef}
      multiple
      withCredentials
      onSuccess={(res: any) => {
        onUploadSuccess && onUploadSuccess(res.attachment);
      }}
    >
      <div style={styles}>Clic o arrastra aqui para subir</div>
    </Uploader>
  );
};
