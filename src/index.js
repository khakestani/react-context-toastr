import ToastrProvider from "./ToastrProvider";
import * as ContextToastrActions from "./actions";
import ContextToastrReducer from "./reducer";
import { toastrEmitter } from "./toastrEmitter";

export default ToastrProvider;
export const actions = ContextToastrActions;
export const reducer = ContextToastrReducer;
export const toastr = toastrEmitter;
