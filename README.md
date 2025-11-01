# 🎵 Suno Music Generator for Odie

A comprehensive web application for generating children's audio content, including Brand Themes (iconic intros with narration beds) and Lullabies (extended soft tracks) using the Suno music generation platform.

## Features

### 🤖 AI-Powered Automation (NEW!)

Generate complete music structures automatically using LLMs! The AI Generator provides easy-to-use "tuning knobs" for bulk prompt generation:

- **Multiple LLM Provider Support**:
  - OpenAI (GPT-4o, GPT-4o-mini, GPT-3.5-turbo)
  - Anthropic (Claude 3.5 Sonnet, Claude 3.5 Haiku)
  - Ollama (Local models: Llama 3.2, Mistral, etc.)
  - OpenRouter (Access to multiple providers)

- **AI Configuration Panel**:
  - Secure API key storage (saved locally)
  - Model selection for each provider
  - Connection testing
  - Local LLM support via Ollama

- **AI Prompt Generator with Smart Controls**:
  - **Title & Description Input**: Brief description and AI generates the rest
  - **Duration Slider**: Adjust target duration (30s-5min), AI creates appropriate sections
  - **Instrument Selector**: Pick instruments, AI builds full prompts around them
  - **Bulk Generation**: Create 1-5 variations at once with different approaches
  - **Variation Preview**: See all generated options before applying
  - **One-Click Apply**: Select and apply any variation instantly

### Core Functionality
- **Brand Themes**: Generate iconic intro music with narration beds
- **Lullabies**: Create extended, soft, peaceful tracks for children
- **Tag-Based Configuration**: Style tags and exclude tags for precise control
- **Structure Builder**: Visual editor for creating music sections
- **Lyric Prompt System**: Bracketed sections format `[SectionType | instrument]`
- **Duration Control**: More sections = longer output (12+ sections for 3-minute tracks)

### UI Components

#### 1. Tag Input System
- Add/remove style tags (e.g., upbeat, playful, gentle, soothing)
- Add/remove exclude tags (e.g., dark, sad, loud, harsh)
- Autocomplete suggestions for common tags
- Visual tag display with easy removal

#### 2. Structure Builder
- Add, remove, and reorder music sections
- Choose from section types: Intro, Verse, Chorus, Bridge, Hook, Interlude, Outro
- Select instruments for each section
- Visual feedback for track duration (12+ sections = 3min+)
- Real-time section count and estimated duration

#### 3. Lyric Prompt Editor
- Text editor with bracketed section format
- Auto-generation from structure builder
- Real-time duration estimation
- Line count and section count display

#### 4. Presets System
Four built-in presets to get started quickly:
- **Brand Theme - Energetic**: Upbeat, playful intro music
- **Brand Theme - Iconic Intro**: Memorable, bright opening
- **Lullaby - Soft Dreams**: Gentle 12-section peaceful track
- **Lullaby - Extended Peaceful**: 14-section extended calm track

#### 5. Batch Generation
- Generate multiple variations with a single click
- Configurable batch size (1-10 generations)
- Automatic naming for batch items

#### 6. Rating System
- 5-star rating for each generation
- Track favorites and quality
- Easy comparison of different generations

#### 7. Generation History
- View all generated music configurations
- See style tags, exclude tags, and section counts
- Rate and organize generations
- Delete unwanted generations
- Timestamp tracking

## Installation

```bash
# Clone the repository
git clone https://github.com/kylearch/conductor.git
cd conductor

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This app is a static frontend application with no backend requirements, making it perfect for free static hosting services.

### GitHub Pages (Recommended)

**Automatic Deployment (Recommended)**

The repository is configured with GitHub Actions for automatic deployment:

1. Go to your GitHub repository settings
2. Navigate to **Settings → Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
4. Push to the `main` branch and the site will automatically deploy
5. Your site will be available at: `https://kylearch.github.io/conductor/`

**Manual Deployment**

```bash
# Build the project
npm run build

# The dist/ folder contains your static site
# Push the dist folder to the gh-pages branch
npx gh-pages -d dist
```

### Other Hosting Options

**Netlify**
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy automatically on push

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kylearch/conductor)

**Vercel**
1. Import your GitHub repository in Vercel
2. Framework Preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy automatically on push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kylearch/conductor)

**Cloudflare Pages**
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Deploy automatically on push

### Important Notes for Deployment

- ✅ **No backend needed** - Everything runs in the browser
- ✅ **API keys are safe** - Stored only in browser localStorage
- ✅ **CORS-friendly** - All LLM APIs support CORS for browser requests
- ⚠️ **HTTPS required** - LLM providers require secure connections (all hosting options provide HTTPS)
- 💡 **Environment variables not needed** - Users configure their own API keys in the UI

## Usage

### Quick Start with AI (Recommended)

1. **Configure AI** (one-time setup):
   - Expand the "AI Configuration" panel
   - Select your LLM provider (OpenAI, Anthropic, Ollama, or OpenRouter)
   - Enter your API key (or set up local Ollama)
   - Click "Test Connection" to verify it works

2. **Generate with AI**:
   - Expand the "AI Prompt Generator" panel
   - Enter a brief description (e.g., "A playful bedtime song about stars")
   - Adjust the duration slider to your target length
   - Select instruments you want to use
   - Choose how many variations to generate (1-5)
   - Click "Generate with AI"
   - Review the variations and click "Use This Variation" on your favorite

3. **Refine and Generate**:
   - The selected variation automatically populates your structure and prompt
   - Adjust style/exclude tags if needed
   - Click "Generate Music" to save the configuration

### Manual Quick Start

1. **Choose a Preset**: Click on one of the four preset buttons to load pre-configured settings
2. **Customize Tags**: Add style tags (what you want) and exclude tags (what you don't want)
3. **Build Structure**: Use the Structure Builder to add, remove, or rearrange sections
4. **Edit Prompt**: Refine the lyric prompt or auto-generate it from your structure
5. **Generate**: Click the Generate button to create your music configuration

### AI Generation Examples

**Example 1: Brand Theme**
```
Description: "An energetic intro for a science show for kids"
Duration: 60 seconds
Instruments: kalimba hook, xylophone, bright synth
Variations: 3

AI generates multiple options with different structures:
- Variation 1: Hook-focused with quick intro
- Variation 2: Verse-heavy with gradual build
- Variation 3: Balanced with memorable chorus
```

**Example 2: Lullaby**
```
Description: "Peaceful ocean-themed bedtime music"
Duration: 3 minutes (180 seconds)
Instruments: soft piano, ambient pad, gentle strings, music box
Variations: 3

AI generates extended structures with:
- Appropriate section counts (~12 sections)
- Instrument variety and rotation
- Soothing progressions
```

### Creating a Brand Theme

Brand themes are short, iconic introductions with narration beds:

```
Style Tags: upbeat, playful, energetic, iconic, memorable
Exclude Tags: dark, sad, slow
Sections: 3-5 sections (~45-75 seconds)

Example Structure:
[Intro | kalimba hook]
[Verse | ambient pad]
[Hook | bright synth]
```

### Creating a Lullaby

Lullabies are extended, soft, peaceful tracks:

```
Style Tags: gentle, soft, soothing, calm, peaceful, lullaby
Exclude Tags: loud, fast, energetic, harsh
Sections: 12-14 sections (3+ minutes)

Example Structure:
[Intro | soft piano]
[Verse | ambient pad]
[Verse | music box]
[Chorus | gentle strings]
... (repeat with variations)
[Outro | fading ambient]
```

### Understanding Duration

- Each bracketed section adds approximately **15 seconds** to the track
- For a **3-minute track**, use **12 or more sections**
- Brand themes typically use **3-5 sections** (45-75 seconds)
- Lullabies typically use **12-14 sections** (3-3.5 minutes)

### Batch Generation

Generate multiple variations with the same configuration:

1. Set your desired configuration (tags, structure, prompt)
2. Adjust the "Batch Generation" number (1-10)
3. Click "Generate Music" to create all variations at once
4. Each variation will be numbered automatically

### Rating and History

- All generations are saved in the history panel
- Click stars to rate each generation (1-5 stars)
- Use ratings to track your best configurations
- Delete unwanted generations with the trash icon
- Filter by category (Brand Theme or Lullaby)

## Project Structure

```
conductor/
├── src/
│   ├── components/
│   │   ├── TagInput.tsx           # Tag input with suggestions
│   │   ├── TagInput.css
│   │   ├── StructureBuilder.tsx   # Section builder interface
│   │   ├── StructureBuilder.css
│   │   ├── LyricPromptEditor.tsx  # Prompt editor with auto-generation
│   │   ├── LyricPromptEditor.css
│   │   ├── GenerationHistory.tsx  # History and rating system
│   │   ├── GenerationHistory.css
│   │   ├── AIConfig.tsx           # AI provider configuration (NEW)
│   │   ├── AIConfig.css
│   │   ├── AIGenerator.tsx        # AI prompt generator with controls (NEW)
│   │   └── AIGenerator.css
│   ├── services/
│   │   └── llmService.ts          # LLM API integration (NEW)
│   ├── App.tsx                    # Main application component
│   ├── App.css
│   ├── types.ts                   # TypeScript type definitions
│   ├── presets.ts                 # Preset configurations
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Technology Stack

- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **CSS**: Custom styling with responsive design
- **ESLint**: Code quality and consistency

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Tips

1. The app uses local state management (React hooks)
2. All data is stored in memory (no backend required)
3. Generations are not persisted between sessions
4. Responsive design works on desktop, tablet, and mobile

## Configuration Options

### Section Types
- Intro
- Verse
- Chorus
- Bridge
- Hook
- Interlude
- Outro

### Instrument Options
- kalimba hook
- ukulele
- xylophone
- ambient pad
- gentle chimes
- soft piano
- music box
- gentle strings
- soft harp
- fading ambient
- bright synth
- soft strings
- marimba
- acoustic guitar
- celeste

### Style Tag Suggestions
upbeat, playful, energetic, gentle, soft, soothing, calm, peaceful, dreamy, friendly, bright, iconic, memorable, slow, lullaby, children

### Exclude Tag Suggestions
dark, sad, aggressive, loud, fast, harsh, complex, long

## AI Configuration Guide

### OpenAI Setup

1. Visit [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key and paste it into the AI Configuration panel
6. Recommended models: `gpt-4o-mini` (fast and affordable) or `gpt-4o` (higher quality)

### Anthropic Setup

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key and paste it into the AI Configuration panel
6. Recommended models: `claude-3-5-sonnet-20241022` (balanced) or `claude-3-5-haiku-20241022` (fast)

### Ollama Setup (Local/Free)

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Run Ollama locally (it starts automatically after installation)
3. Pull a model: `ollama pull llama3.2` or `ollama pull mistral`
4. In the app, select "Ollama" as provider
5. Default base URL is `http://localhost:11434` (usually correct)
6. No API key needed!
7. Best for: Privacy-focused users or those wanting free local generation

### OpenRouter Setup

1. Visit [openrouter.ai](https://openrouter.ai)
2. Create an account or sign in
3. Add credits to your account
4. Generate an API key
5. Copy the key and paste it into the AI Configuration panel
6. OpenRouter gives access to many models through one API

### Cost Considerations

- **OpenAI GPT-4o-mini**: ~$0.15 per 1M input tokens (very affordable)
- **Anthropic Claude 3.5 Haiku**: ~$0.80 per 1M input tokens (affordable)
- **Anthropic Claude 3.5 Sonnet**: ~$3 per 1M input tokens (premium)
- **Ollama**: Free (runs locally on your computer)

For context: Generating 10 variations typically uses 2,000-5,000 tokens, costing $0.0003-$0.015 with GPT-4o-mini.

## Best Practices

### General Tips
1. **Start with a Preset**: Use presets as templates and customize from there
2. **Balance Sections**: More sections = longer tracks, but maintain musical flow
3. **Use Appropriate Tags**: Match style tags to your category (Brand Theme vs Lullaby)
4. **Exclude Strategically**: Exclude tags help refine the mood more than adding style tags
5. **Test Variations**: Use batch generation to create multiple options
6. **Rate Everything**: Use the rating system to track what works best

### AI Generation Tips
1. **Be Specific in Descriptions**: "Playful xylophone melody for a cooking show intro" works better than "upbeat music"
2. **Use the Duration Slider**: Let AI calculate the right number of sections for your target length
3. **Select Multiple Instruments**: Gives AI more options for variety
4. **Generate Multiple Variations**: Different structural approaches can surprise you
5. **Iterate**: Use a generated variation as a starting point, then manually refine
6. **Set Tags First**: Style/exclude tags help guide AI generation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.