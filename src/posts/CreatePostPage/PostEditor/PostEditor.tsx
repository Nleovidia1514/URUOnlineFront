import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import environment from '../../../core/environment';
import { Post } from '../../../core/models/Post.model';

interface PostEditorProps {
  onEditorChange: (content: string) => void;
  post?: Post | null;
}

export default (props: PostEditorProps) => {
  return (
    <Editor
      apiKey={environment.tinyApiKey}
      initialValue={props.post ? props.post.content : '<p>This is the initial content of the editor</p>'}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code codesample help wordcount',
        ],
        toolbar:
          `undo redo | formatselect | bold italic backcolor codesample | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | preview help`,
      }}
      onEditorChange={props.onEditorChange}
    />
  );
};
