import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  FlexboxGrid,
} from 'rsuite';
import { Post } from '../../../core/models/Post.model';

interface ViewPostHeaderProps {
  post: Post | null;
}

export default ({ post }: ViewPostHeaderProps) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <Container style={{ maxHeight: '100px' }}>
      <FlexboxGrid align='middle'>
        <FlexboxGrid.Item colspan={20} order={1}>
          <h1>{post?.title}</h1>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20}>
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                appearance='subtle'
                onClick={() => history.push(location.pathname + '/edit')}
              >
                Editar
              </Button>
              <Button appearance='subtle' color='red'>
                Borrar
              </Button>
              <Button appearance='subtle'>Compartir</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};
