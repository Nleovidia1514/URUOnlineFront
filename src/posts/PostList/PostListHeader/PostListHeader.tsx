import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  FlexboxGrid,
  Header,
} from 'rsuite';

interface PostListHeaderProps {}

export default () => {
  const history = useHistory();

  const onSelectFilter = (filter: string) => {
    history.push({
      pathname: '/app/posts',
      search: '?page=1&filter=' + filter
    })
  };

  return (
    <Header>
      <Container>
        <FlexboxGrid align='middle'>
          <FlexboxGrid.Item colspan={20} order={1}>
            <h1>Todas las publicaciones</h1>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} order={2}>
            <Button
              appearance='primary'
              onClick={() => history.push('/app/posts/create')}
            >
              Crear Post
            </Button>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8} order={4} style={{ marginTop: '10px' }}>
            <ButtonToolbar>
              <ButtonGroup>
                <Button
                  appearance='ghost'
                  onClick={() => onSelectFilter('new')}
                >
                  Nuevos
                </Button>
                <Button
                  appearance='ghost'
                  onClick={() => onSelectFilter('active')}
                >
                  Activos
                </Button>
                <Button
                  appearance='ghost'
                  onClick={() => onSelectFilter('rated')}
                >
                  Mas votados
                </Button>
                <Button
                  appearance='ghost'
                  onClick={() => onSelectFilter('career')}
                >
                  Carrera
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
    </Header>
  );
};
