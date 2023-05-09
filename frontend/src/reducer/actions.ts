import { Photo, Photos } from '../slider/Types';

type Action =
  | { type: 'pics/get'; payload: Photos }
  | { type: 'pics/upload'; payload: Photo }
  | { type: 'pics/delAll' };
export default Action;
