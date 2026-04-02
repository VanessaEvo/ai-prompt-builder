import type { SavedPrompt } from '../types/prompt';

export const exportToJson = (prompts: SavedPrompt[]) => {
  const exportData = {
    version: "1.0.0",
    appVersion: "1.0.0",
    exportedAt: new Date().toISOString(),
    prompts: prompts
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai-prompts-export-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToMarkdown = (prompts: SavedPrompt[]) => {
  let content = '# Saved AI Prompts\n\n';
  prompts.forEach(p => {
    content += `## ${p.name}\n`;
    content += `**Saved at:** ${p.timestamp.toLocaleString()}\n\n`;
    content += `**Prompt:**\n\`\`\`\n${p.prompt}\n\`\`\`\n\n`;
    content += `---\n\n`;
  });

  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai-prompts-export-${new Date().toISOString().split('T')[0]}.md`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToText = (prompts: SavedPrompt[]) => {
  let content = '';
  prompts.forEach(p => {
    content += `${p.name}\n`;
    content += `${p.prompt}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai-prompts-export-${new Date().toISOString().split('T')[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importFromJson = async (file: File): Promise<SavedPrompt[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.version && json.prompts && Array.isArray(json.prompts)) {
          // ensure dates are properly reinstantiated
          interface RawPrompt { timestamp?: string; created_at?: string; [key: string]: unknown }
          const prompts = json.prompts.map((p: RawPrompt) => ({
            ...p,
            timestamp: new Date((p.timestamp || p.created_at || new Date()) as string)
          }));
          resolve(prompts as SavedPrompt[]);
        } else {
          reject(new Error("Invalid schema"));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};

export const downloadAsText = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
