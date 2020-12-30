import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Divider, List, Loader } from 'rsuite';
import { getExamsAction, setCurrentExamAction } from '../../store/actions/exam.actions';
import { AppState } from '../../store/reducers';
import CreateExamModal from '../CreateExamModal/CreateExamModal';

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);
  const currentExams = useSelector(
    (state: AppState) => state.exams.currentExams
  );
  const loading = useSelector((state: AppState) => state.exams.loading);

  useEffect(() => {
    dispatch(getExamsAction());
  }, [dispatch]);

  return (
    <div>
      {' '}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 style={{ display: 'inline' }}>Examenes</h1>
        <Button color='blue' onClick={() => setShowCreate(true)}>
          Agregar examen
        </Button>
      </div>
      <Divider />
      <List hover>
        {loading ? (
          <Loader center />
        ) : (
          currentExams.map((x) => (
            <List.Item
              style={{ cursor: 'pointer' }}
              key={x._id}
              onClick={() => {
                history.push('/app/exams/' + x._id);
                dispatch(setCurrentExamAction(x));
              }}
            >
              <h1>{x.name}</h1>
            </List.Item>
          ))
        )}
      </List>
      <CreateExamModal show={showCreate} close={() => setShowCreate(false)} />
    </div>
  );
};
