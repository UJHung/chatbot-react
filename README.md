# Chatbot React

A modern chatbot application built with React and Vite.

## Features

- 🤖 AI-powered chatbot interface
- ⚡️ Fast development with Vite and HMR
- 🎨 Modern UI/UX
- 🔒 Environment variable configuration
- 📱 Responsive design

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/chatbot-react.git
cd chatbot-react
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys and configuration.

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=your_api_url
VITE_OPENAI_API_KEY=your_api_key
# Add other variables as needed
```

**Note:** All environment variables must be prefixed with `VITE_` to be accessible in the app.

## Project Structure

```
chatbot-react/
├── src/
│   ├── components/     # React components
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── public/            # Static assets
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
└── package.json       # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
