import React from 'react';
import Helmet from 'react-helmet';

const TitleComponent = (title: any) => {
  const defaultTitle = 'Susan Wabbajack Sucks';
  return (
    <Helmet>
      <title>{title.title ? title.title + " | Susan Wabbajack Sucks" : defaultTitle}</title>
    </Helmet>
  );
};

export { TitleComponent };