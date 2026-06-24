import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
  
});
export default client;