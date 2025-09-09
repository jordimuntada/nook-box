# Quick Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Vercel account (free)
- Git repository (GitHub recommended)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Test Locally
```bash
npm start
```
Visit: http://localhost:3000

### 3. Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# Follow prompts to link project
```

#### Option B: GitHub Integration
1. Push code to GitHub
2. Go to vercel.com
3. Import GitHub repository
4. Deploy automatically

## Project Structure
```
nook-box/
├── public/           # Static files
│   ├── index.html   # Main website
│   └── translations.js
├── server.js        # Express server
├── package.json     # Dependencies
├── vercel.json     # Vercel config
└── README.md       # Documentation
```

## Features
- ✅ Responsive design
- ✅ Multi-language support (9 languages)
- ✅ Dynamic year in footer
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Vercel ready