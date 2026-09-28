/**
 * The 晴 / 夜 route is stored on <html data-theme> and mirrored into
 * localStorage. The root layout runs ROUTE_SCRIPT in <head> so the
 * correct sky paints before anything else.
 */
export const ROUTE_KEY = "aozora-route";

/** fired on window whenever the sky changes, so the toggle can re-read it */
export const ROUTE_EVENT = "aozora:route";

export const ROUTE_SCRIPT = `(function(){try{var r=localStorage.getItem("${ROUTE_KEY}");if(r==="night"){document.documentElement.dataset.theme="night"}}catch(e){}})();`;

export type Route = "day" | "night";
