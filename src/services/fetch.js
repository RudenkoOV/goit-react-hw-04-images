const API_KEY = '33615803-a98e5e1974f174420a01d7a6e';
const API_LINK = 'https://pixabay.com/api/';

export function getImages(searchText, page) {
  return fetch(
    `${API_LINK}?q=${searchText}&key=${API_KEY}&page=${page}&per_page=12`
  ).then(res => res.json());
}
