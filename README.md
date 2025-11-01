# 🎵 Suno Music Generator for Odie

A comprehensive web application for generating children's audio content, including Brand Themes (iconic intros with narration beds) and Lullabies (extended soft tracks) using the Suno music generation platform.

## Features

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

## Usage

### Quick Start

1. **Choose a Preset**: Click on one of the four preset buttons to load pre-configured settings
2. **Customize Tags**: Add style tags (what you want) and exclude tags (what you don't want)
3. **Build Structure**: Use the Structure Builder to add, remove, or rearrange sections
4. **Edit Prompt**: Refine the lyric prompt or auto-generate it from your structure
5. **Generate**: Click the Generate button to create your music configuration

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
│   │   └── GenerationHistory.css
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

## Best Practices

1. **Start with a Preset**: Use presets as templates and customize from there
2. **Balance Sections**: More sections = longer tracks, but maintain musical flow
3. **Use Appropriate Tags**: Match style tags to your category (Brand Theme vs Lullaby)
4. **Exclude Strategically**: Exclude tags help refine the mood more than adding style tags
5. **Test Variations**: Use batch generation to create multiple options
6. **Rate Everything**: Use the rating system to track what works best

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.