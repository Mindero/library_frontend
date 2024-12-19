import React from 'react';
import { SearchBar } from './SearchBar';
import { AllBooks } from './AllBooks';

function HomePage(): JSX.Element {
  return (
    <div className="HomePage">
      <AllBooks/> 
    </div>
  );
}

export default HomePage;