import { mdLinks } from './mdlinks.js';

mdLinks('ejemplo.md')
.catch((err)=>{
  console.log(err);
})
.then((response)=>{
  console.log(response, 'response');
})
