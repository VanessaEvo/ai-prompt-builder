import { describe, it, expect, vi } from 'vitest';
import { exportToJson, exportToText } from '../../src/utils/exportImport';

describe('exportImport', () => {
  it('should export format without crashing', () => {
    // Mock URL and DOM
    global.URL.createObjectURL = vi.fn(() => 'blob:mock');
    global.URL.revokeObjectURL = vi.fn();
    const mockClick = vi.fn();
    
    const originalCreateElement = document.createElement;
    document.createElement = vi.fn().mockImplementation((tagName: string) => {
      if (tagName === 'a') {
        return {
          href: '',
          download: '',
          click: mockClick,
        };
      }
      return originalCreateElement.call(document, tagName);
    }) as typeof document.createElement;

    exportToJson([]);
    expect(mockClick).toHaveBeenCalled();

    exportToText([]);
    expect(mockClick).toHaveBeenCalledTimes(2);
    
    document.createElement = originalCreateElement;
  });
});
