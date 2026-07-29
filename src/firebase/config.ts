import rawConfig from './firebase-applet-config.json';

export const firebaseConfig = {
  ...rawConfig,
  firestoreDatabaseId: (rawConfig as any).firestoreDatabaseId || "(default)"
};
