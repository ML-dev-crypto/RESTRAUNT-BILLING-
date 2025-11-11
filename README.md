# Restaurant Billing System

A modern, responsive restaurant billing web application built with React and Vite.

## Features

- 🍽️ Beautiful UI with sidebar navigation
- 📱 Fully responsive design
- 🛒 Real-time order cart management
- 💰 Automatic subtotal, tax, and total calculation
- 🎨 Modern orange-themed design
- 📦 Category-based menu filtering (All Dishes, Main, Sides, Desserts, Drinks)
- ➕➖ Quantity adjustment for items
- 🗑️ Remove items from cart

## Project Structure

```
restaurant-billing/
├── src/
│   ├── components/
│   │   ├── MenuItem.jsx          # Individual menu item card
│   │   ├── MenuItem.css
│   │   ├── OrderCart.jsx         # Order cart with billing
│   │   └── OrderCart.css
│   ├── data/
│   │   └── menuData.js           # Menu items data
│   ├── App.jsx                   # Main application
│   ├── App.css                   # Main styles
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## If PowerShell Execution Policy Error Occurs

If you get an error about running scripts being disabled, run this command in PowerShell as Administrator:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Or run the commands directly in Command Prompt (cmd) instead of PowerShell.

## Usage

1. **Browse Menu**: Click on category buttons in the left sidebar (All Dishes, Main, Sides, Desserts, Drinks)
2. **Add Items**: Click the orange "+" button on any menu item to add it to your order
3. **Manage Order**: 
   - Use "+/-" buttons to adjust quantities
   - Click the trash icon to remove items
   - View real-time subtotal, tax (8%), and total
4. **Place Order**: Click the "Place Order" button when ready
5. **Generate Bill**: Click the "Bill" button to generate a receipt

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **JavaScript ES6+** - Modern JavaScript

## Features Implementation

### Menu Items
- 14 different items across 4 categories
- Each item has: name, description, price, category, and emoji icon
- Responsive card layout with hover effects

### Order Management
- Add items to cart with automatic quantity tracking
- Update quantities with +/- buttons
- Remove items from cart
- Real-time price calculations

### Billing
- Subtotal calculation
- Tax calculation (8%)
- Grand total display
- Order number and table number display

## Responsive Design

- **Desktop (>1200px)**: Full three-column layout with sidebar, menu grid, and order cart
- **Tablet (768px - 1200px)**: Collapsible order cart
- **Mobile (<768px)**: Bottom navigation bar, stacked menu items

## Customization

### Change Tax Rate
Edit the `taxRate` variable in `src/components/OrderCart.jsx`:
```javascript
const taxRate = 0.08; // 8% tax
```

### Add New Menu Items
Add items to `src/data/menuData.js`:
```javascript
{
  id: 15,
  name: "New Item",
  description: "Item description",
  price: 9.99,
  category: "Main", // Main, Sides, Desserts, or Drinks
  image: "🍕"
}
```

### Change Theme Colors
Edit CSS variables in `src/App.css`:
- Primary orange: `#ff8c42`
- Hover orange: `#ff7a2e`

## License

MIT License - feel free to use this project for your own purposes!

## Author

Built with ❤️ using React and Vite
