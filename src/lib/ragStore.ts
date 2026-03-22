export const RAGStore = {
  getPreferences: (): string[] => {
    try {
      const data = localStorage.getItem('aias_rag_preferences');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  addPreferences: (newPrefs: string[]) => {
    try {
      const existing = RAGStore.getPreferences();
      // Combine and remove exact duplicates
      const updated = Array.from(new Set([...existing, ...newPrefs]));
      localStorage.setItem('aias_rag_preferences', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to RAG store", e);
    }
  },
  clear: () => {
    localStorage.removeItem('aias_rag_preferences');
  }
};
