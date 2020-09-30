import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const loading = useSelector((state: AppState) => state.posts.loading);
  const [formValue, setFormValue] = useState({
    title: '',
    content: '',
    tags: [''],
  });
  let form = useRef<any>(null);
  const onPostSubmit = useCallback(() => {
    if (form.current.check()) {
      dispatch(postActions.createPostAction(formValue));
    }
  }, [dispatch, formValue]);
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
          onEditorChange={(content: string) =>
            setFormValue({ ...formValue, content })
          }
        />
        <br></br>
        <ControlLabel style={{ marginTop: '20px' }}>
          Etiquetas (Minimo 3*)
        </ControlLabel>
        <br></br>
        <DynamicTag onChangeTags={(tags) => setFormValue({ ...formValue, tags })} />
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
