import React, { ElementRef } from 'react';
import { useState } from 'react';
import { Icon, Loader, Uploader } from 'rsuite';
import { FileType } from 'rsuite/lib/Uploader';

function previewFile(file: File, callback: (arg: any) => void) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file as File);
}

const styles = {
  width: 150,
  height: 150,
};

export type UploaderProps = {
  img?: string;
  uploaderRef?: ElementRef<typeof Uploader>;
  action: string;
  autoupload?: boolean;
  onSuccessUpload: (response: Object, file: FileType) => void;
  onErrorUpload?: (error: any) => void;
};

export default ({
  img,
  action,
  autoupload = true,
  uploaderRef,
  onSuccessUpload,
  onErrorUpload,
}: UploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(img);

  return (
    <Uploader
      fileListVisible={false}
      multiple={false}
      listType='picture'
      accept='image/*'
      action={action}
      ref={uploaderRef}
      autoUpload={autoupload}
      withCredentials
      onChange={(file) => {
        previewFile(file[0].blobFile as File, (value) => {
          setFileInfo(value);
        });
      }}
      onUpload={() => {
        setUploading(true);
      }}
      onSuccess={(response: Object, file: FileType) => {
        setUploading(false);
        onSuccessUpload(response, file);
      }}
      onError={(error) => {
        setFileInfo(null);
        setUploading(false);
        onErrorUpload(error);
      }}
    >
      <button style={styles}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} width='100%' height='100%' alt='profile' />
        ) : (
          <Icon icon='camera' size='5x' />
        )}
      </button>
    </Uploader>
  );
};
