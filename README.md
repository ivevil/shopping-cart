# Shopping Cart

A modern shopping cart built with Next.js, React, and TypeScript. The app supports product selection, quantity controls, cart totals, stock validation, theme switching, and a polished accessible UI.

## Stack

- Next.js 14
- React 18
- TypeScript
- CSS variables for theme support

## Run locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
```

## Features

- Product selection from a dropdown list
- Product prices displayed in the selection list
- Quantity controls with a compact stepper instead of a full-width slider
- Max-stock and cart-limit validation
- Real-time total preview for the selected item
- Shopping cart summary with unit price, item count, and total
- Remove single items or clear the entire cart
- Order confirmation modal
- Light and dark theme switcher
- Accessible contrast and focus states
- Responsive layout

## UX behavior

- Quantity is clamped to the active product stock and cart limit
- Picking a new product resets the quantity to 1
- The total updates after a small delay for a smoother feel
- The add-to-cart button is blocked when the selected quantity would exceed rules

## Notes

- The project uses the App Router in Next.js
- `.next` output is intentionally ignored in Git
- Use a fresh Next.js cache when rebuilding after stale errors:

```bash
rm -rf .next
npm run build
```

## Project status

This version reflects the latest UI refresh and accessibility improvements, including the final compact quantity selector treatment.

