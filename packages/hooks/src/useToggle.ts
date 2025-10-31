import { useCallback, useState } from "react";

export interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

export const useToggle = (initial = false): UseToggleReturn => {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setOn = useCallback(() => setValue(true), []);
  const setOff = useCallback(() => setValue(false), []);

  return { value, toggle, setOn, setOff };
};
