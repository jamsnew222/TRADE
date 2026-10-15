/**
 * Persisted simulator portfolios — survive reloads so practice feels real.
 * Separate keys for the two simulators; all reads are SSR-safe.
 */

const SIM_KEY = 'tradequest-simulator-portfolio';
const PAPER_KEY = 'tradequest-paper-portfolio';

function load<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function save(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full/blocked — portfolio simply won't persist
  }
}

export const loadSimulatorPortfolio = <T>() => load<T>(SIM_KEY);
export const saveSimulatorPortfolio = (p: unknown) => save(SIM_KEY, p);
export const resetSimulatorPortfolio = () => {
  if (typeof window !== 'undefined') localStorage.removeItem(SIM_KEY);
};

export const loadPaperPortfolio = <T>() => load<T>(PAPER_KEY);
export const savePaperPortfolio = (p: unknown) => save(PAPER_KEY, p);
export const resetPaperPortfolio = () => {
  if (typeof window !== 'undefined') localStorage.removeItem(PAPER_KEY);
};
