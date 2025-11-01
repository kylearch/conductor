import { useState } from 'react';
import { LLMConfig, LLMProvider } from '../types';
import './AIConfig.css';

interface AIConfigProps {
  config: LLMConfig;
  onConfigChange: (config: LLMConfig) => void;
  onTest?: () => Promise<boolean>;
}

const DEFAULT_MODELS: Record<LLMProvider, string[]> = {
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
  ollama: ['llama3.2', 'llama3.1', 'mistral', 'gemma2'],
  openrouter: ['anthropic/claude-3.5-sonnet', 'openai/gpt-4o', 'meta-llama/llama-3.1-70b-instruct'],
};

export default function AIConfig({ config, onConfigChange, onTest }: AIConfigProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleProviderChange = (provider: LLMProvider) => {
    onConfigChange({
      ...config,
      provider,
      model: DEFAULT_MODELS[provider][0],
      baseUrl: provider === 'ollama' ? 'http://localhost:11434' : undefined,
    });
  };

  const handleTest = async () => {
    if (!onTest) return;

    setIsTesting(true);
    setTestResult(null);

    try {
      const success = await onTest();
      setTestResult(success ? 'success' : 'error');
    } catch {
      setTestResult('error');
    } finally {
      setIsTesting(false);
    }
  };

  const needsApiKey = config.provider !== 'ollama';
  const isConfigured = needsApiKey ? config.apiKey.trim() !== '' : true;

  return (
    <div className="ai-config">
      <div className="ai-config-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="ai-config-title">
          <span className="ai-icon">🤖</span>
          <h3>AI Configuration</h3>
          {isConfigured && <span className="config-status">✓ Configured</span>}
        </div>
        <button type="button" className="toggle-btn">
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="ai-config-content">
          <div className="form-group">
            <label htmlFor="provider">Provider</label>
            <select
              id="provider"
              value={config.provider}
              onChange={(e) => handleProviderChange(e.target.value as LLMProvider)}
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="ollama">Ollama (Local)</option>
              <option value="openrouter">OpenRouter</option>
            </select>
          </div>

          {needsApiKey && (
            <div className="form-group">
              <label htmlFor="apiKey">API Key</label>
              <input
                id="apiKey"
                type="password"
                value={config.apiKey}
                onChange={(e) => onConfigChange({ ...config, apiKey: e.target.value })}
                placeholder={`Enter your ${config.provider} API key`}
              />
            </div>
          )}

          {config.provider === 'ollama' && (
            <div className="form-group">
              <label htmlFor="baseUrl">Base URL</label>
              <input
                id="baseUrl"
                type="text"
                value={config.baseUrl || 'http://localhost:11434'}
                onChange={(e) => onConfigChange({ ...config, baseUrl: e.target.value })}
                placeholder="http://localhost:11434"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="model">Model</label>
            <select
              id="model"
              value={config.model}
              onChange={(e) => onConfigChange({ ...config, model: e.target.value })}
            >
              {DEFAULT_MODELS[config.provider].map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {onTest && isConfigured && (
            <div className="test-section">
              <button
                type="button"
                onClick={handleTest}
                disabled={isTesting}
                className="test-btn"
              >
                {isTesting ? 'Testing...' : 'Test Connection'}
              </button>
              {testResult === 'success' && (
                <span className="test-result success">✓ Connection successful!</span>
              )}
              {testResult === 'error' && (
                <span className="test-result error">✗ Connection failed. Check your settings.</span>
              )}
            </div>
          )}

          <div className="ai-config-info">
            <p>
              {config.provider === 'ollama' ? (
                <>
                  <strong>Local LLM:</strong> Make sure Ollama is running locally.
                  Install from <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">ollama.ai</a>
                </>
              ) : (
                <>
                  <strong>API Key:</strong> Your API key is stored locally and never sent to our servers.
                  {config.provider === 'openai' && ' Get your key from platform.openai.com'}
                  {config.provider === 'anthropic' && ' Get your key from console.anthropic.com'}
                  {config.provider === 'openrouter' && ' Get your key from openrouter.ai'}
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
