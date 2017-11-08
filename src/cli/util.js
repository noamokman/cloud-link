import updateNotifier from 'update-notifier';
import pkg from '../../package.json';

export const notifier = updateNotifier({pkg});

export const notify = () => notifier.notify();
