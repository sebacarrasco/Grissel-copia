import axios from 'axios';

export default axios.create({
  baseURL: `https://cryptic-stream-92098.herokuapp.com/`
});

// Para usarlo: https://www.digitalocean.com/community/tutorials/react-axios-react-es