import State from './StateType';
import Action from './actions';

export const initialState: State = {
  photos: [],
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'pics/get':
      return { ...state, photos: [...action.payload] };
    case 'pics/upload':
      return { ...state, photos: [...state.photos, action.payload] };
    case 'pics/delAll':
      return { ...state, photos: [] };
    default:
      return state;
  }
}
