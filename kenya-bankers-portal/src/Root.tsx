import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import InactivityWrapper from './InactivityWrapper';

const Root = () => (
  <RouterProvider router={router}>
    <InactivityWrapper>
        <RouterProvider router={router} />
    </InactivityWrapper>
  </RouterProvider>
);

export default Root;