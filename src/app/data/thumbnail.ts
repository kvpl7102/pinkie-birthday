export type PhotoThumbnail = { src:string; alt:string; caption?:string; w?:number; h?:number; objectPosition?:string };

export const thumbnail: PhotoThumbnail = {
  src: '/img/ftu/ftu-coverimg.JPG',         
  alt: 'FTU — Cover',
  objectPosition: 'center',
};