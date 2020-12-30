import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Container } from 'rsuite';
import AssignationDetail from './AssignationDetail/AssignationDetail';
import AssignationsList from './AssignationsList/AssignationsList';

export default () => {
  const match = useRouteMatch();
  return (
    <Container style={{ flex: 0 }}>
      <Switch>
        <Route path={match.path + '/'} exact component={AssignationsList} />
        <Route path={match.path + '/:assignId'} exact component={AssignationDetail} />
      </Switch>
    </Container>
  );
};
