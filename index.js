/**
 * @phucbm/tailwindcss-style-props - A Tailwind CSS plugin for easily adding multiple inline style properties
 */

import plugin from 'tailwindcss/plugin';

/**
 * A Tailwind CSS plugin that adds a `style` utility for applying inline CSS properties
 */
export default plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'style': (value) => {
        // Process the input value to handle edge cases with var()
        let processedValue = value;

        // Check if value starts with var( and doesn't have a matching )
        if (processedValue.startsWith('var(') &&
          (processedValue.indexOf(')') > processedValue.indexOf('=') ||
            processedValue.indexOf(')') === -1)) {
          // Remove the incorrect var( prefix
          processedValue = processedValue.replace(/^var\(/, '');
          
          // Also remove any trailing ) if it exists at the end
          if (processedValue.endsWith(')')) {
            processedValue = processedValue.replace(/\)$/, '');
          }
        }

        // Split by semicolons to get individual CSS declarations
        const declarations = processedValue.split(';').filter(Boolean);

        // Convert declarations into a CSS object using equals sign
        const styles = {};
        declarations.forEach(declaration => {
          // Handle the case with both = and : in the declaration
          if (declaration.includes('=')) {
            const [property, val] = declaration.split('=').map(part => part.trim());
            if (property && val) {
              styles[property] = val;
            }
          }
        });

        return styles;
      },
    },
    {
      values: theme('style', { DEFAULT: '' }),
      modifiers: 'any',
      arbitrary: true
    }
  );
}, {
  theme: {
    style: {}
  }
});
