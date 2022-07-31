import { useEffect } from "react";
import { track } from "@amplitude/analytics-browser";

export const useTrackOnMount = (name: string) => {
  useEffect(() => {
    track(name);
  }, []);
};
