import { useCallback, useState } from "react";

class HistoryItem {
  /**
   * 
   * @param {string} type 
   * @param {any} value 
   */
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

export default function useHistory() {
  const [history, setHistory] = useState([]);

  /**
   * Add a new history item.
   * 
   * @param {string} type - The type of the history item (e.g. action type).
   * @param {any} value - The value to store in the history item.
   */
  const addHistory = useCallback((type, value) => {
    const newItem = new HistoryItem(type, value);
    setHistory((prev) => [...prev, newItem]);
  }, []);

  /**
   * Remove the last history item.
   */
  const popHistory = useCallback(() => {
    setHistory((prev) => prev.slice(0, -1));
  }, []);

  /**
   * Clear the history.
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

   /**
   * Get the last history item.
   * 
   * @returns {HistoryItem | undefined} - The last history item or undefined if history is empty.
   */
   const getLastHistory = useCallback(() => {
    const latest = history.length > 0 ? history[history.length - 1] : undefined
    if (!latest) {
      console.error('Empty historial')
    }
    return latest;
  }, [history]);

  return {
    history,
    addHistory,
    clearHistory,
    popHistory,
    getLastHistory
  };
}
