import React, { ElementRef, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  FlexboxGrid,
  Icon,
} from 'rsuite';
import ConfirmModal from '../../../core/components/ConfirmModal';
import { Post } from '../../../core/models/Post.model';
import { postActions } from '../../../store/actions';
import { AppState } from '../../../store/reducers';

interface ViewPostHeaderProps {
  post: Post | null;
}

export default ({ post }: ViewPostHeaderProps) => {
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const modal = useRef<ElementRef<typeof ConfirmModal>>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const deletePost = useCallback(() => {
    dispatch(postActions.deletePostAction(post?._id as string));
  }, [post, dispatch]);

  return (
    <Container style={{ maxHeight: 200 }}>
      <FlexboxGrid align='middle'>
        <FlexboxGrid.Item colspan={20} order={1}>
          <h1>{post?.title}</h1>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20}>
          <ButtonToolbar>
            <ButtonGroup>
              {currentUser?._id === post?.owner?._id ? (
                <>
                  <Button
                    appearance='subtle'
                    onClick={() => history.push(location.pathname + '/edit')}
                  >
                    Editar
                  </Button>
                  <Button
                    appearance='subtle'
                    color='red'
                    onClick={() => modal.current?.open()}
                  >
                    Borrar
                  </Button>
                </>
              ) : null}
              <Button appearance='subtle'>Compartir</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <ConfirmModal ref={modal} onConfirm={deletePost}>
        <Icon
          icon='remind'
          style={{
            color: '#ffb300',
            fontSize: 24,
          }}
        />
        {'  '}
        <p>
          Una vez presione confirmar este post sera eliminado incluyendo sus
          comentarios y todo lo relacionado a el.
        </p>
        <br />
        <strong>¿Esta seguro que desea hacerlo?</strong>
      </ConfirmModal>
    </Container>
  );
};
