import React from 'react';

import Example from './Example';

import logo from './logo.svg';

export default function App() {
  return (
    <section>
      <header>
        <h1>
          <img height="50px" src={logo} alt="Close logo" />
        </h1>
      </header>
      <Example />
    </section>
  );
}
