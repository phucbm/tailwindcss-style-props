import plugin from './index.js';
import tailwindcss from 'tailwindcss';
import { expect, describe, it, jest, beforeEach } from '@jest/globals';

describe('@phucbm/tailwindcss-style-props', () => {
  it('registers the style utility', () => {
    const mockMatchUtilities = jest.fn();
    const mockTheme = jest.fn(() => ({}));
    
    // Use plugin.handler for plugins created with import syntax
    const handler = plugin.__proto__.handler || plugin.handler;
    handler({ matchUtilities: mockMatchUtilities, theme: mockTheme });
    
    expect(mockMatchUtilities).toHaveBeenCalledWith(
      expect.objectContaining({
        style: expect.any(Function)
      }),
      expect.anything()
    );
  });

  describe('style utility', () => {
    let styleUtility;
    
    beforeEach(() => {
      const mockMatchUtilities = jest.fn((utilities) => {
        styleUtility = utilities.style;
      });
      
      // Extract the handler function
      const handler = plugin.__proto__.handler || plugin.handler;
      handler({ 
        matchUtilities: mockMatchUtilities, 
        theme: () => ({}) 
      });
    });
    
    it('parses simple property-value pairs', () => {
      const result = styleUtility('color=red;font-size=16px');
      expect(result).toEqual({
        color: 'red',
        'font-size': '16px'
      });
    });
    
    it('handles CSS variables', () => {
      const result = styleUtility('color=var(--text-color)');
      expect(result).toEqual({
        color: 'var(--text-color)'
      });
    });
    
    it('fixes incorrect var() prefix', () => {
      const result = styleUtility('var(color=red;font-size=16px)');
      expect(result).toEqual({
        color: 'red',
        'font-size': '16px'
      });
    });
    
    it('fixes incorrect var() prefix with closing parenthesis', () => {
      const result = styleUtility('var(color=red;font-size=16px)');
      expect(result).toEqual({
        color: 'red',
        'font-size': '16px'
      });
    });
    
    it('ignores declarations without equals sign', () => {
      const result = styleUtility('color=red;invalid-declaration;font-size=16px');
      expect(result).toEqual({
        color: 'red',
        'font-size': '16px'
      });
    });
    
    it('ignores empty declarations', () => {
      const result = styleUtility('color=red;;font-size=16px;');
      expect(result).toEqual({
        color: 'red',
        'font-size': '16px'
      });
    });
  });
});
