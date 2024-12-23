import React from 'react';
import { SearchBar } from './SearchBar';
import { AllBooks } from './AllBooks';
import { useNavigate } from 'react-router-dom';

function HomePage(): JSX.Element {
 
  return (
    <div className="HomePage">
      <AllBooks/>
    </div>
  );
}

export default HomePage;