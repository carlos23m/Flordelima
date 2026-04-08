# Finca Florlima - Farm Website

A modern, responsive website for **Finca Florlima**, a family farm specializing in premium dairy products and fresh limes.

## 🌾 About Finca Florlima

Finca Florlima is a generations-old family farm dedicated to producing high-quality agricultural products:

- **Fresh Limes** - Bright, juicy limes freshly picked from our orchard
- **Cow Milk** - Fresh, creamy milk from our healthy cows
- **Cow Cheese** - Artisanal cheese made from premium cow milk
- **Goat Milk** - Smooth, nutritious goat milk from our gentle herd
- **Goat Cheese** - Creamy, delicious cheese crafted from fresh goat milk

## ✨ Features

- **Bilingual Support** - English and Spanish (Spanish as default)
- **Modern Design** - Clean, professional interface with green color scheme reflecting the farm aesthetic
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- **Product Showcase** - Display of all 5 products with descriptions
- **Farm Story** - Learn about our three generations of farming tradition
- **Contact Information** - Easy way to reach us for orders and inquiries
- **Language Toggle** - Switch between English and Spanish with one click

## 🛠️ Technology Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with CSS variables
- **JavaScript ES6+** - Modern JavaScript features

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/carlos23m/Finca_Florlima.git
cd Finca_Florlima
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build for Production

To create a production build:
```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready for deployment.

## 🎨 Customization

### Color Scheme
Edit the CSS variables in `src/index.css` to customize the green color palette:
```css
:root {
  --accent: #2d8a6f;        /* Primary green */
  --accent-light: #4db896;  /* Light green */
  --accent-dark: #1f5f4d;   /* Dark green */
  /* ... more colors ... */
}
```

### Content
Update text and product information in `src/App.jsx`:
- Modify the `text` object to change any content
- Add or remove products from the `en` and `es` translations

## 📱 Add Your Farm Images

To add images to the website:
1. Place your images in the `src/assets/` directory
2. Import them at the top of `src/App.jsx`
3. Update the corresponding image references in the component

## 👤 Contact Information

**Marlen Navarro Saenz**
- Phone: 88438492
- SINPE Móvil: 88438492

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## 📸 Gallery Sections

The website includes dedicated sections for:
- Farm imagery and landscape
- Healthy cows
- Gentle goats
- Product showcase

## 🌐 Deployment

This website can be easily deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📞 Support

For questions or support, please contact us directly at the phone number above or through the website contact form.
