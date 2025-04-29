# @phucbm/tailwindcss-style-props

[![release](https://badgen.net/github/release/phucbm/tailwindcss-style-props/)](https://www.npmjs.com/package/@phucbm/tailwindcss-style-props)
[![npm weekly download](https://badgen.net/npm/dm/@phucbm/tailwindcss-style-props)](https://www.npmjs.com/package/@phucbm/tailwindcss-style-props)

A Tailwind CSS plugin that enables easy addition of multiple inline style properties using a custom `style` utility.

## Installation

```bash
# Using npm
npm install @phucbm/tailwindcss-style-props

# Using yarn
yarn add @phucbm/tailwindcss-style-props

# Using pnpm
pnpm add @phucbm/tailwindcss-style-props
```

## Setup

Add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  // ...rest of your config
  plugins: [
    require('@phucbm/tailwindcss-style-props'),
    // ...other plugins
  ],
}
```

## Usage

Use the `style` utility to add multiple inline style properties:

```html
<!-- Basic usage -->
<div class="style-[color=red;font-size=16px]">
  This text will be red with a font-size of 16px
</div>

<!-- With CSS variables -->
<div class="style-[color=var(--my-color);background=var(--my-bg)]">
  Using CSS variables
</div>

<!-- Complex values -->
<div class="style-[transform=rotate(45deg);transition=all_0.3s_ease]">
  Complex property values
</div>
```

## How it works

The plugin parses the string value provided to the `style` utility by:

1. Splitting the string by semicolons (`;`) to get individual CSS declarations
2. For each declaration, splitting by equals sign (`=`) to get property-value pairs
3. Converting these pairs into a CSS object that Tailwind can apply

## Examples

```html
<!-- Multiple properties -->
<div class="style-[color=blue;padding=10px;margin=5px]">
  Multiple styles applied
</div>

<!-- With responsive prefixes -->
<div class="md:style-[display=flex;gap=10px]">
  Only applies on medium screens and up
</div>

<!-- With hover state -->
<div class="hover:style-[background=yellow;color=black]">
  Changes on hover
</div>

<!-- Combined with other utilities -->
<div class="rounded shadow p-4 style-[max-width=500px;margin=0_auto]">
  Combined with standard Tailwind utilities
</div>
```

## Notes

- Use equals sign (`=`) instead of colons (`:`) to separate property and value
- Use semicolons (`;`) to separate multiple style declarations
- For complex values with spaces, use underscores (`_`), which will be interpreted as spaces

## License

MIT