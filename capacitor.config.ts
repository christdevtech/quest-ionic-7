import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "quest-ionic-7",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    Camera: {
      sync: true,
    },
    Filesystem: {
      sync: true,
    },
    Preferences: {
      sync: true,
    },
  },
};

export default config;
