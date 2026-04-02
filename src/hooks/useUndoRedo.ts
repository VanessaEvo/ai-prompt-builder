import { useState, useCallback } from 'react';

interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useUndoRedo<T>(initialPresent: T, maxHistory = 30) {
  const [state, setState] = useState<UndoRedoState<T>>({
    past: [],
    present: initialPresent,
    future: []
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    setState((prevState) => {
      if (prevState.past.length === 0) return prevState;

      const previous = prevState.past[prevState.past.length - 1];
      const newPast = prevState.past.slice(0, prevState.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [prevState.present, ...prevState.future]
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prevState) => {
      if (prevState.future.length === 0) return prevState;

      const next = prevState.future[0];
      const newFuture = prevState.future.slice(1);

      return {
        past: [...prevState.past, prevState.present],
        present: next,
        future: newFuture
      };
    });
  }, []);

  const set = useCallback((newPresent: T | ((prev: T) => T)) => {
    setState((prevState) => {
      const resolvedPresent = newPresent instanceof Function ? newPresent(prevState.present) : newPresent;
      
      if (resolvedPresent === prevState.present) return prevState;

      const newPast = [...prevState.past, prevState.present];
      if (newPast.length > maxHistory) {
        newPast.shift();
      }

      return {
        past: newPast,
        present: resolvedPresent,
        future: []
      };
    });
  }, [maxHistory]);

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: []
    });
  }, []);

  return {
    state: state.present,
    set,
    undo,
    redo,
    reset,
    canUndo,
    canRedo
  };
}
