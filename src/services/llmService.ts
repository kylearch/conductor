import { LLMConfig, AIGenerationParams, MusicSection } from '../types';

export class LLMService {
  private config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
  }

  async generatePromptVariations(params: AIGenerationParams): Promise<MusicSection[][]> {
    const systemPrompt = this.buildSystemPrompt(params);
    const userPrompt = this.buildUserPrompt(params);

    try {
      const response = await this.callLLM(systemPrompt, userPrompt);
      return this.parseResponse(response, params.variationCount);
    } catch (error) {
      console.error('LLM generation error:', error);
      throw new Error(`Failed to generate prompts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private buildSystemPrompt(params: AIGenerationParams): string {
    const category = params.category === 'Brand Theme' ? 'brand theme' : 'lullaby';

    return `You are an expert music producer specializing in children's audio content. Your task is to create structured music prompts for ${category} generation.

Each prompt consists of musical sections in the format: [SectionType | instrument]
- Each section is approximately 15 seconds long
- Target duration: ${params.targetDuration} seconds (${Math.ceil(params.targetDuration / 15)} sections)

Section Types Available:
- Intro: Opening section that sets the mood
- Verse: Main melodic content
- Chorus: Memorable, repeating section (for Brand Themes)
- Bridge: Transitional section with variation
- Hook: Short, catchy melodic phrase (for Brand Themes)
- Interlude: Brief instrumental break
- Outro: Closing section that wraps up the piece

${params.category === 'Brand Theme'
  ? 'Brand Themes should be: Short (45-75 seconds), iconic, memorable, with clear hooks and space for narration.'
  : 'Lullabies should be: Extended (3+ minutes), gentle, soothing, with repetitive calming patterns.'
}

Style requirements:
- INCLUDE: ${params.styleTags.join(', ')}
- EXCLUDE: ${params.excludeTags.join(', ')}

Available instruments: ${params.instruments.join(', ')}

Generate ${params.variationCount} distinct variations with different structural approaches and instrument combinations.`;
  }

  private buildUserPrompt(params: AIGenerationParams): string {
    const titleSection = params.title ? `Title: "${params.title}"\n` : '';

    return `${titleSection}Description: ${params.description}

Create ${params.variationCount} variations of music structures. Each variation should:
1. Have approximately ${Math.ceil(params.targetDuration / 15)} sections
2. Use different combinations of the available instruments
3. Have a distinct structural approach
4. Follow the style requirements

Format each variation as a numbered list with sections like:
Variation 1:
[Intro | soft piano]
[Verse | ambient pad]
...

Variation 2:
[Intro | music box]
[Verse | gentle strings]
...

Only output the sections in the exact format shown. No additional commentary.`;
  }

  private async callLLM(systemPrompt: string, userPrompt: string): Promise<string> {
    switch (this.config.provider) {
      case 'openai':
        return this.callOpenAI(systemPrompt, userPrompt);
      case 'anthropic':
        return this.callAnthropic(systemPrompt, userPrompt);
      case 'ollama':
        return this.callOllama(systemPrompt, userPrompt);
      case 'openrouter':
        return this.callOpenRouter(systemPrompt, userPrompt);
      default:
        throw new Error(`Unsupported provider: ${this.config.provider}`);
    }
  }

  private async callOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async callAnthropic(systemPrompt: string, userPrompt: string): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.config.model || 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Anthropic API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  private async callOllama(systemPrompt: string, userPrompt: string): Promise<string> {
    const baseUrl = this.config.baseUrl || 'http://localhost:11434';
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model || 'llama3.2',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        stream: false,
        options: {
          temperature: 0.8,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message.content;
  }

  private async callOpenRouter(systemPrompt: string, userPrompt: string): Promise<string> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
        'HTTP-Referer': window.location.origin,
      },
      body: JSON.stringify({
        model: this.config.model || 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenRouter API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private parseResponse(response: string, expectedVariations: number): MusicSection[][] {
    const variations: MusicSection[][] = [];

    // Split by variation markers
    const variationRegex = /Variation\s+\d+:\s*/gi;
    const parts = response.split(variationRegex).filter(part => part.trim());

    for (let i = 0; i < Math.min(parts.length, expectedVariations); i++) {
      const sections = this.parseSections(parts[i]);
      if (sections.length > 0) {
        variations.push(sections);
      }
    }

    // If we didn't get enough variations, try parsing the entire response as one block
    if (variations.length === 0) {
      const sections = this.parseSections(response);
      if (sections.length > 0) {
        variations.push(sections);
      }
    }

    return variations;
  }

  private parseSections(text: string): MusicSection[] {
    const sections: MusicSection[] = [];
    const sectionRegex = /\[(.*?)\s*\|\s*(.*?)\]/g;

    let match;
    let index = 0;
    while ((match = sectionRegex.exec(text)) !== null) {
      const type = match[1].trim();
      const instrument = match[2].trim();

      sections.push({
        id: `${Date.now()}-${index}`,
        type,
        instrument,
      });
      index++;
    }

    return sections;
  }
}

export const testConnection = async (config: LLMConfig): Promise<boolean> => {
  try {
    const service = new LLMService(config);
    const testParams: AIGenerationParams = {
      description: 'Test connection',
      category: 'Brand Theme',
      targetDuration: 30,
      instruments: ['piano'],
      styleTags: ['test'],
      excludeTags: [],
      variationCount: 1,
    };

    await service.generatePromptVariations(testParams);
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};
