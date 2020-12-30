import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Schema } from 'rsuite';
import { postActions } from '../../../store/actions';
import { AppState } from '../../../store/reducers';
import PostEditor from '../../CreatePostPage/PostEditor/PostEditor';

const { StringType } = Schema.Types;
const model = Schema.Model({
  content: StringType('Por favor ingrese una un contenido valido.')
    .isRequiredOrEmpty('Este campo es obligatorio.')
    .minLength(6),
});

export default () => {
  const dispatch = useDispatch();
  const post = useSelector((state: AppState) => state.posts.currentPost);
  const user = useSelector((state: AppState) => state.auth.currentUser);
  const [formValue, setFormValue] = useState({
    content: '',
  });
  let form = useRef<any>(null);

  const sendComment = useCallback(() => {
    if (form.current.check() && post) {
      dispatch(
        postActions.createCommentAction({
          ...formValue,
          postId: post?._id as string,
          votes: 0,
          createdDate: new Date(),
          owner: user ?? undefined,
        })
      );
    }
  }, [formValue, dispatch, user, post]);

  return (
    <Container>
      <h4>Agregar Comentario</h4> 
      <br />
      <Form
        ref={form}
        fluid
        onChange={(formValue) => setFormValue(formValue as any)}
        formValue={formValue}
        model={model}
      >
        <PostEditor
          onEditorChange={(content: string) =>
            setFormValue({ ...formValue, content })
          }
        />
        <br></br>
        <Button appearance='primary' onClick={sendComment}>
          Enviar comentario
        </Button>
      </Form>
    </Container>
  );
};
