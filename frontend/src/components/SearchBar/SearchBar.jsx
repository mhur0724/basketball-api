import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ onSearch, placeholder = 'Search...' }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(inputValue);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [inputValue, onSearch]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Form onKeyDown={e => { if (e.key === 'Enter') e.preventDefault(); }} className='shadow-none'>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
    </Form>
  );
};

export default SearchBar;