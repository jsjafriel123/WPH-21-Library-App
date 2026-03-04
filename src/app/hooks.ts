import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
