import { useEffect } from "react";
import { track } from "@amplitude/analytics-browser";

export interface UseTrackOnMountProps {
  name: string;
}

export const useTrackOnMount = (props: UseTrackOnMountProps) => {
  useEffect(() => {
    track(props.name);
  }, []);
};
