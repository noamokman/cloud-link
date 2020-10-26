import store from '../store';

export default () => ({
  cloudPath: store.get('cloudPath') as string
});
