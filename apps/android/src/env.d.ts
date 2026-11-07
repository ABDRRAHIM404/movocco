/**
 * Ambient declarations for the Movocco Android pilot.
 *
 * Expo inlines `EXPO_PUBLIC_*` variables at build time. There is no
 * `.env` file committed to the repo; see `.env.example`.
 */
declare const process: {
  env: {
    EXPO_PUBLIC_SUPABASE_URL?: string;
    EXPO_PUBLIC_SUPABASE_ANON_KEY?: string;
    [key: string]: string | undefined;
  };
};

declare module '*.png' {
  const value: number;
  export default value;
}
