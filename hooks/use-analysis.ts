import { useState, useCallback } from 'react';
import type { AnalysisResult } from '@/lib/gemini';

export interface AnalysisState {
  isLoading: boolean;
  currentStep: number;
  error: string | null;
  keyword: string;
  analysis: AnalysisResult | null;
  newsletterDraft: string | null;
  sourceData: any | null;
}

export interface AnalysisSettings {
  limit?: number;
  creativity?: number[];
  includeStats?: boolean;
  targetAudience?: string;
}

const ANALYSIS_STEPS = [
  'Searching Reddit discussions...',
  'Analyzing content with AI...',
  'Extracting key insights...',
  'Generating newsletter draft...',
  'Finalizing results...'
];

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>({
    isLoading: false,
    currentStep: 0,
    error: null,
    keyword: '',
    analysis: null,
    newsletterDraft: null,
    sourceData: null
  });

  const updateStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({ 
      ...prev, 
      error, 
      isLoading: false,
      currentStep: 0 
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const startAnalysis = useCallback(async (
    keyword: string, 
    settings: AnalysisSettings = {}
  ) => {
    if (!keyword.trim()) {
      setError('Please enter a keyword');
      return;
    }

    if (keyword.length < 2 || keyword.length > 100) {
      setError('Keyword must be between 2 and 100 characters');
      return;
    }

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      keyword: keyword.trim(),
      currentStep: 0,
      analysis: null,
      newsletterDraft: null,
      sourceData: null
    }));

    try {
      // Simulate step progression
      const stepInterval = setInterval(() => {
        setState(prev => {
          const nextStep = prev.currentStep + 1;
          if (nextStep >= ANALYSIS_STEPS.length) {
            clearInterval(stepInterval);
            return prev;
          }
          return { ...prev, currentStep: nextStep };
        });
      }, 1000);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: keyword.trim(),
          limit: settings.limit || 50,
          settings
        }),
      });

      clearInterval(stepInterval);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        currentStep: ANALYSIS_STEPS.length,
        analysis: data.analysis,
        newsletterDraft: data.newsletter_draft,
        sourceData: data.source_data,
        error: null
      }));

      return data;

    } catch (error) {
      console.error('Analysis failed:', error);
      
      let errorMessage = 'Analysis failed. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error.message.includes('No relevant posts')) {
          errorMessage = 'No discussions found for this keyword. Try a different or more general term.';
        } else {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      return null;
    }
  }, [setError]);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      currentStep: 0,
      error: null,
      keyword: '',
      analysis: null,
      newsletterDraft: null,
      sourceData: null
    });
  }, []);

  const getCurrentStepText = useCallback(() => {
    if (state.currentStep >= ANALYSIS_STEPS.length) {
      return 'Analysis complete!';
    }
    return ANALYSIS_STEPS[state.currentStep] || 'Preparing...';
  }, [state.currentStep]);

  const getProgress = useCallback(() => {
    if (!state.isLoading && state.analysis) return 100;
    if (!state.isLoading) return 0;
    return Math.min((state.currentStep / ANALYSIS_STEPS.length) * 100, 95);
  }, [state.isLoading, state.currentStep, state.analysis]);

  return {
    ...state,
    startAnalysis,
    reset,
    clearError,
    getCurrentStepText,
    getProgress,
    totalSteps: ANALYSIS_STEPS.length,
    steps: ANALYSIS_STEPS
  };
}
