import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Container, ControlLabel, Form, Schema } from 'rsuite';
import DynamicTag from '../../core/components/controls/DynamicTag';
import Input from '../../core/components/controls/Input';
import { postActions } from '../../store/actions';
import { AppState } from '../../store/reducers';
import PostEditor from './PostEditor/PostEditor';

const { StringType, ArrayType } = Schema.Types;
const model = Schema.Model({
  title: StringType('Por favor ingrese un titulo valido.').isRequiredOrEmpty(
    'Este campo es obligatorio.'
  ),
  content: StringType('Por favor ingrese una un contenido valido.')
    .isRequiredOrEmpty('Este campo es obligatorio.')
    .minLength(6),
  tags: ArrayType().of(StringType()).minLength(3),
});

export default () => {
  let form = useRef<any>(null);
  const dispatch = useDispatch();

  const loading = useSelector((state: AppState) => state.posts.loading);
  const currentPost = useSelector((state: AppState) => state.posts.currentPost);
  const { id } = useParams() as any;

  const [formValue, setFormValue] = useState({
    title: '',
    content: '',
    tags: [] as string[],
  });

  const onPostSubmit = useCallback(() => {
    if (form.current.check()) {
      if (id) {
        dispatch(postActions.updatePostAction({
          ...currentPost,
          ...formValue
        }));
      } else {
        dispatch(postActions.createPostAction(formValue));
      }
    }
  }, [dispatch, currentPost, formValue, id]);

  useEffect(() => {
    if (id) {
      dispatch(postActions.searchPostByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPost) {
      setFormValue(currentPost as any);
    }
  }, [currentPost])

  if (id && !currentPost) {
    return <></>;
  } 

  return (
    <Container>
      <Form
        ref={form}
        fluid
        onChange={(formValue) => setFormValue(formValue as any)}
        formValue={formValue}
        model={model}
      >
        <Input label='Titulo' name='title' />

        <PostEditor
          post={currentPost}
          onEditorChange={(content: string) =>
            setFormValue({ ...formValue, content })
          }
        />
        <br></br>
        <ControlLabel style={{ marginTop: '20px' }}>
          Etiquetas (Minimo 3*)
        </ControlLabel>
        <br></br>
        <DynamicTag tags={formValue.tags} onChangeTags={(tags) => setFormValue({ ...formValue, tags })} />
        <br></br>
        <Button
          loading={loading}
          disabled={loading}
          appearance='primary'
          onClick={onPostSubmit}
        >
          Crear Post
        </Button>
      </Form>
    </Container>
  );
};
