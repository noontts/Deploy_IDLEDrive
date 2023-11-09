import React from 'react';

const ContentContainer = ({ children }) => {
  return (
    <main style={{ padding: '16px', height: 'fit-content' }}>
      {children}
    </main>
  );
};

export default ContentContainer;