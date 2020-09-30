import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Schema } from 'rsuite';
import { postActions } from '../../../store/actions';
import { AppState } from '../../../store/reducers';
import PostEditor from '../../CreatePostPage/PostEditor/PostEditor';

const { StringType } = Schema.Types;
const model = Schema.Model({
  postId: StringType('Este campo es requerido.').isRequired(),
  content: StringType('Por favor ingrese una un contenido valido.')
    .isRequiredOrEmpty('Este campo es obligatorio.')
    .minLength(6),
});

export default () => {
  const dispatch = useDispatch();
  const post = useSelector((state: AppState) => state.posts.currentPost);
  const user = useSelector((state: AppState) => state.auth.currentUser);
  const [formValue, setFormValue] = useState({
    postId: post?._id ? post._id : '',
    content: '',
  });
  let form = useRef<any>(null);

  const sendComment = useCallback(() => {
    if (form.current.check()) {
      dispatch(
        postActions.createCommentAction({
          ...formValue,
          votes: 0,
          createdDate: new Date(),
          owner: user ?? undefined,
        })
      );
    }
  }, [formValue, dispatch, user]);

  return (
    <Container>
      <h3>Agregar Comentario</h3>
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
