# Nook - Wooden Phone Storage Box

A beautiful, handcrafted wooden phone storage box designed to help families create meaningful connections through intentional digital wellness.

## Features

- 🌳 Sustainable materials (Oak, Walnut, Bamboo)
- 🧲 Magnetic closure
- 🎨 Premium interior (Felt or Cork lining)
- 📱 Perfect dimensions for all smartphones
- 🔧 Hidden hinges for clean aesthetics
- ✋ Handcrafted quality

## Tech Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript
- **Backend**: Node.js, Express.js
- **Deployment**: Vercel
- **Languages**: 9 languages supported (EN, ES, FR, DE, PT, IT, NL, DA, CA)

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Start production server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Visit `http://localhost:3000`

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts** to link your project to Vercel

### Option 2: Deploy via GitHub

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Node.js project

3. **Deploy:**
   - Vercel will automatically deploy on every push to main branch

## Project Structure

```
nook-box/
├── public/                 # Static files
│   ├── index.html         # Main HTML file
│   └── translations.js    # Multi-language translations
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel configuration
└── README.md             # This file
```

## Environment Variables

No environment variables required for basic functionality.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Multi-language Support**: 9 languages with dynamic language switching
- **Dynamic Year**: Copyright year updates automatically
- **Smooth Animations**: CSS animations and scroll effects
- **SEO Optimized**: Meta tags and semantic HTML
- **Performance**: Compressed assets and optimized loading

## Customization

### Adding New Languages

1. Add new language option to the language selector in `public/index.html`
2. Add translations to `public/translations.js`
3. The language switching will work automatically

### Styling

The project uses Tailwind CSS. You can customize:
- Colors in the `tailwind.config` section of `index.html`
- Animations in the `<style>` section
- Component styles using Tailwind classes

## Support

For questions or support, please contact us through the contact form on the website.

## License

MIT License - see LICENSE file for details.