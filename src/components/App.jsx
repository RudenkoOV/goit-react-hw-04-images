import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { AppMain } from './App.styled';

export default function App () {
  const [searchText, setSearchText] = useState('');

    return (
      <AppMain>
        <Searchbar createSearchText={setSearchText} />
        <ImageGallery searchText={searchText} />
      </AppMain>
    );
}
