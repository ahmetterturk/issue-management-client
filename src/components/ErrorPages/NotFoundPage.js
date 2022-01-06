import React from 'react';
import Errors from './Errors';
import notFoundImage from '../../images/notfound.jpg';
const NotFoundPage = () => {
  return (
    <Errors
      status='404'
      title='The page you are looking for isn’t here'
      errorMessage='You either tried some shady route or you came here by mistake.
      Whichever it is, try using the navigation'
      route='/issues'
      imageSrc={notFoundImage}
      btnMessage='Back to main page'
    />
  );
};

export default NotFoundPage;
