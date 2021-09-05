//pixabay.com/api/

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '23250095-f2af5bd72bd110fab39dfaa61';

function getPictures(query, page) {
  return axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${KEY}
`);
}

export default getPictures;
