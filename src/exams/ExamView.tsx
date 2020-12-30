import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import {  Container } from 'rsuite';
import ExamViewer from './ExamViewer/ExamViewer';
import ExamsList from './ExamsList/ExamsList';

export default () => {
  const match = useRouteMatch();

  return (
    <Container>
      <Switch>
        <Route path={match.path + '/saved'} exact component={ExamsList} />
        <Route path={match.path + '/:id'} exact component={ExamViewer} />
      </Switch>
    </Container>
  );
};
