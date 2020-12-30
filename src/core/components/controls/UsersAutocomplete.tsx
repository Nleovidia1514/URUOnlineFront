import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete, Avatar, Col, Grid } from 'rsuite';
import { AppState } from '../../../store/reducers';
import { User } from '../../models/User.model';
import _ from 'lodash';
import { authActions } from '../../../store/actions';

export interface UserAutocompleteProps {
  label: string;
  onSelect: (user: User) => void;
  filter?: (users: User[]) => User[];
}

export default ({ label, onSelect, filter }: UserAutocompleteProps) => {
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.auth.autocompleteUsers);

  const delayedQuery = useCallback(
    _.debounce((q) => {
      //setLoading(true);
      dispatch(authActions.searchUsersAction(q));
    }, 500),
    []
  );

  const handleChange = useCallback(
    (val) => {
      val && delayedQuery(val);
    },
    [delayedQuery]
  );

  useEffect(() => {
    return () => {
      delayedQuery.cancel();
    }
  }, [delayedQuery]);
  
  return (
    <>
      <label>{label}</label>
      <br/>
      <AutoComplete
        filterBy={(value, item) => true}
        renderItem={(item) => {
          const user = item as User;
          return (
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              key={user._id}
            >
              <Grid style={{ width: '500px' }}>
                <Col sm={2} md={2}>
                  <Avatar circle src={user.profileImg}></Avatar>
                </Col>
                <Col sm={1}></Col>
                <Col sm={21} md={21}>
                  <p>{user.name + ' ' + user.lastname}</p>
                  <p>{user.email}</p>
                </Col>
              </Grid>
            </div>
          );
        }}
        onChange={handleChange}
        data={filter ? filter(users) : users}
        onSelect={(e) => onSelect(e as User)}
      ></AutoComplete>
    </>
  );
};
