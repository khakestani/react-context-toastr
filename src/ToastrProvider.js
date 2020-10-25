/* eslint-disable object-curly-spacing */
import React, { useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ToastrBox from './ToastrBox';
import ToastrConfirm from './ToastrConfirm';
import * as actions from './actions';
import { EE } from './toastrEmitter';
import { guid, updateConfig } from './utils';
import { TRANSITIONS } from './constants';
import reducer, { initialState } from './reducer';
import config from './config';

const StateProvider = React.createContext();
const DispatchProvider = React.createContext();

const ContextToastr = props => {
  const displayName = 'ToastrProvider';
  const { add, showConfirm, clean, removeByType, remove } = props;

  const dispatch = useContext(DispatchProvider);

  const toastrFired = {};

  const toastrPositions = [
    'top-left',
    'top-right',
    'top-center',
    'bottom-left',
    'bottom-right',
    'bottom-center',
  ];

  updateConfig(props);

  const addDispatcher = payload => {
    dispatch(add(payload));
  };
  const showConfirmDispatcher = payload => {
    dispatch(showConfirm(payload));
  };
  const cleanDispatcher = payload => {
    dispatch(clean(payload));
  };
  const removeByTypeDispatcher = payload => {
    dispatch(removeByType(payload));
  };
  const removeDispatcher = payload => {
    dispatch(remove(payload));
  };

  useEffect(() => {
    EE.on('toastr/confirm', showConfirmDispatcher);
    EE.on('add/toastr', addDispatcher);
    EE.on('clean/toastr', cleanDispatcher);
    EE.on('removeByType/toastr', removeByTypeDispatcher);
    EE.on('remove/toastr', removeDispatcher);

    () => {
      EE.removeListener('toastr/confirm');
      EE.removeListener('add/toastr');
      EE.removeListener('clean/toastr');
      EE.removeListener('removeByType/toastr');
      EE.removeListener('remove/toastr');
      toastrFired = {};
    };
  }, []);

  const _addToMemory = id => {
    toastrFired[id] = true;
  };

  const _renderToastrForPosition = position => {
    const { toastrs } = props.toastr;

    if (toastrs) {
      return toastrs
        .filter(item => item.position === position)
        .map(item => {
          const mergedItem = {
            ...item,
            options: {
              progressBar: props.progressBar,
              transitionIn: props.transitionIn,
              transitionOut: props.transitionOut,
              closeOnToastrClick: props.closeOnToastrClick,
              ...item.options,
            },
          };

          return (
            <div key={item.id}>
              <ToastrBox
                inMemory={toastrFired}
                addToMemory={() => _addToMemory(item.id)}
                item={mergedItem}
                {...props}
              />
              {item.options && item.options.attention && (
                <div
                  onClick={() => {
                    if (typeof item.options.onAttentionClick === 'function') {
                      item.options.onAttentionClick(item.id);
                    } else {
                      props.remove(item.id);
                    }
                  }}
                  className="toastr-attention"
                />
              )}
            </div>
          );
        });
    }
  };

  const _renderToastrs = () => {
    const { toastr } = props;
    const width =
      toastr.toastrs &&
      toastr.toastrs[0] &&
      toastr.toastrs[0].options &&
      toastr.toastrs[0].options.width;
    const style = width ? { width: width } : {};
    return (
      <div>
        {toastrPositions.map(position => {
          return (
            <div key={position} className={position} style={style}>
              {_renderToastrForPosition(position)}
            </div>
          );
        })}
      </div>
    );
  };

  const { className, toastr } = props;
  return (
    <>
      <div className={cn('context-toastr', className)} aria-live="assertive">
        {toastr.confirm && (
          <ToastrConfirm confirm={toastr.confirm} {...props} />
        )}
        {_renderToastrs()}
      </div>
    </>
  );
};

ContextToastr.propTypes = {
  toastr: PropTypes.object,
  position: PropTypes.string,
  newestOnTop: PropTypes.bool,
  timeOut: PropTypes.number,
  confirmOptions: PropTypes.object,
  progressBar: PropTypes.bool,
  transitionIn: PropTypes.oneOf(TRANSITIONS.in),
  transitionOut: PropTypes.oneOf(TRANSITIONS.out),
  preventDuplicates: PropTypes.bool,
  closeOnToastrClick: PropTypes.bool,
};

ContextToastr.defaultProps = {
  position: 'top-right',
  newestOnTop: true,
  timeOut: 5000,
  progressBar: false,
  transitionIn: TRANSITIONS.in[0],
  transitionOut: TRANSITIONS.out[0],
  preventDuplicates: false,
  closeOnToastrClick: false,
  getState: state => state.toastr,
  confirmOptions: {
    okText: 'ok',
    cancelText: 'cancel',
  },
};

export let toastrsCache = [];

const testReducer = (state = initialState, toastr) => {
  if (toastr.ignoreToastr) {
    return state;
  }

  const newToastr = {
    id: guid(),
    position: config.position,
    ...toastr,
  };

  if (
    !newToastr.a11yId &&
    toastr &&
    toastr.hasOwnProperty('id') &&
    !toastr.hasOwnProperty('a11yId')
  ) {
    newToastr.a11yId = toastr.id;
  }

  let newState = {};
  if (!config.newestOnTop) {
    newState = {
      ...state,
      toastrs: [...state.toastrs, newToastr],
    };
  } else {
    newState = {
      ...state,
      toastrs: [newToastr, ...state.toastrs],
    };
  }
  toastrsCache = newState.toastrs;
  return newState;
};

const ToastrProvider = ({ children, ...rest }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {}, [state]);
  return (
    <DispatchProvider.Provider value={dispatch}>
      <StateProvider.Provider value={state}>
        <ContextToastr {...rest} {...actions} toastr={state} />
        {children}
      </StateProvider.Provider>
    </DispatchProvider.Provider>
  );
};

export default ToastrProvider;
