// index.js

import { mdLinks } from './mdlinks.js';

mdLinks('mdlinks.js')
  .then((response) => {
    console.log(response, 'response');
  })
  .catch((err) => {
    console.error(err);
  });
