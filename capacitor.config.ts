import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.forgefit.app',
  appName: 'ForgeFit',
  webDir: 'out',
  server: {
    url: 'https://forgefit.vercel.app',
    cleartext: true
  }
};

export default config;
