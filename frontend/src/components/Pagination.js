import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export default function PaginationComponent({ pages, page, isAdmin = false }) {
  return (
    pages > 1 && (
      <Route>
        {({ location }) => {
          return (
            <Pagination
              page={page}
              count={pages}
              renderItem={item => (
                <PaginationItem
                  component={Link}
                  to={
                    !isAdmin
                      ? `/page/${item.page}`
                      : `/admin/products/${item.page}`
                  }
                  {...item}
                />
              )}
            />
          );
        }}
      </Route>
    )
  );
}
