import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Footer, Pagination } from 'rsuite';
import { AppState } from '../../../store/reducers';

export default () => {
  const paging = useSelector((state: AppState) => state.posts.paging);
  const history = useHistory();
  const location = useLocation();
  return (
    <Footer>
      <Container>
        <Pagination
          activePage={paging?.page}
          first={paging?.page !== 1}
          next={paging?.hasNextPage}
          prev={paging?.hasPrevPage}
          last={paging?.page !== paging?.totalPages}
          size='lg'
          pages={paging?.totalPages}
          onSelect={(page) => {
            let filter = new URLSearchParams(location.search).get('filter');
            history.push(`/app/posts?page=${page}&filter=${filter}`);
          }}
        ></Pagination>
      </Container>
    </Footer>
  );
};
