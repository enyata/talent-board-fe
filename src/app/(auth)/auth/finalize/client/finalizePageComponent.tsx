// Kept so any old links to /auth/finalize/client still work; it now goes
// through the same flow as /auth/callback, which scrubs tokens from the URL.
export { default } from "../../callback/callbackPageComponent";
