import React from 'react'
import { storiesOf } from '@storybook/react'
import useMediaQuery from '../src/useMediaQuery'

const queryMobile = '(max-width: 400px)';
const queryTablet = '(min-width: 401px) and (max-width: 640px)';
const queryDesktop = '(min-width: 641px) and (max-width: 1024px)';
const queryLargeDesktop = '(min-width: 1025px)';

function MeduaQueriesSample() {
  const mobile = useMediaQuery(queryMobile);
  const tablet = useMediaQuery(queryTablet);
  const desktop = useMediaQuery(queryDesktop);
  const largeDesktop = useMediaQuery(queryLargeDesktop);
  return (
    <ul>
      <li>
        {queryMobile}
        {' = '}
        {JSON.stringify(mobile)}
      </li>
      <li>
        {queryTablet}
        {' = '}
        {JSON.stringify(tablet)}
      </li>
      <li>
        {queryDesktop}
        {' = '}
        {JSON.stringify(desktop)}
      </li>
      <li>
        {queryLargeDesktop}
        {' = '}
        {JSON.stringify(largeDesktop)}
      </li>
    </ul>
  );
}

storiesOf('useMediaQuery', module)
  .add('default', () => <MeduaQueriesSample />)
