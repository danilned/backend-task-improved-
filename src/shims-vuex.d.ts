import { Store } from '@/store';
import { postsAttributes } from '../../server/src/models/posts';
import { errors } from '../assets/types/types';

declare module '@vue/runtime-core' {
  interface State {
    posts: postsAttributes[];
    errors: errors;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
    emitter: any;
  }
}
