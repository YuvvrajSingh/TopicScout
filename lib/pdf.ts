import jsPDF from 'jspdf';
import type { AnalysisResult } from './gemini';

export interface PDFOptions {
  includeAnalysis: boolean;
  includeCharts: boolean;
  format: 'A4' | 'Letter';
  fontSize: number;
}

export class PDFGenerator {
  private defaultOptions: PDFOptions = {
    includeAnalysis: true,
    includeCharts: false,
    format: 'A4',
    fontSize: 12
  };

  async generateNewsletterPDF(
    keyword: string,
    newsletterContent: string,
    analysis?: AnalysisResult,
    options: Partial<PDFOptions> = {}
  ): Promise<Blob> {
    const opts = { ...this.defaultOptions, ...options };
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: opts.format.toLowerCase() as 'a4' | 'letter'
    });

    // Set up document
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Helper function to check if we need a new page
    const checkPageBreak = (neededHeight: number) => {
      if (yPosition + neededHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };

    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    const title = `Newsletter Draft: ${keyword}`;
    pdf.text(title, margin, yPosition);
    yPosition += 15;

    // Generated date
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 10;

    // Reset color
    pdf.setTextColor(0, 0, 0);
    yPosition += 5;

    // Newsletter content
    pdf.setFontSize(opts.fontSize);
    pdf.setFont('helvetica', 'normal');
    
    const lines = this.processMarkdownContent(newsletterContent);
    
    for (const line of lines) {
      checkPageBreak(8);
      
      if (line.type === 'heading') {
        pdf.setFontSize(opts.fontSize + 2);
        pdf.setFont('helvetica', 'bold');
        pdf.text(line.content, margin, yPosition);
        yPosition += 10;
        pdf.setFontSize(opts.fontSize);
        pdf.setFont('helvetica', 'normal');
      } else if (line.type === 'bullet') {
        const bulletText = `• ${line.content}`;
        const splitText = pdf.splitTextToSize(bulletText, contentWidth - 10);
        for (const textLine of splitText) {
          checkPageBreak(6);
          pdf.text(textLine, margin + 5, yPosition);
          yPosition += 6;
        }
      } else {
        const splitText = pdf.splitTextToSize(line.content, contentWidth);
        for (const textLine of splitText) {
          checkPageBreak(6);
          pdf.text(textLine, margin, yPosition);
          yPosition += 6;
        }
      }
      yPosition += 2;
    }

    // Add analysis section if requested and available
    if (opts.includeAnalysis && analysis) {
      yPosition += 10;
      checkPageBreak(20);
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Analysis Summary', margin, yPosition);
      yPosition += 12;
      
      pdf.setFontSize(opts.fontSize);
      pdf.setFont('helvetica', 'normal');

      // Key insights
      if (analysis.key_insights.length > 0) {
        pdf.setFont('helvetica', 'bold');
        pdf.text('Key Insights:', margin, yPosition);
        yPosition += 8;
        pdf.setFont('helvetica', 'normal');
        
        for (const insight of analysis.key_insights) {
          checkPageBreak(8);
          const bulletText = `• ${insight}`;
          const splitText = pdf.splitTextToSize(bulletText, contentWidth - 10);
          for (const textLine of splitText) {
            pdf.text(textLine, margin + 5, yPosition);
            yPosition += 6;
          }
        }
        yPosition += 5;
      }

      // Sentiment analysis
      checkPageBreak(15);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Sentiment Analysis:', margin, yPosition);
      yPosition += 8;
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Overall Sentiment: ${analysis.sentiment.overall_sentiment}`, margin + 5, yPosition);
      yPosition += 6;
      pdf.text(`Confidence: ${(analysis.sentiment.confidence * 100).toFixed(1)}%`, margin + 5, yPosition);
      yPosition += 10;

      // Top keywords
      if (analysis.top_keywords.length > 0) {
        checkPageBreak(15);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Top Keywords:', margin, yPosition);
        yPosition += 8;
        pdf.setFont('helvetica', 'normal');
        
        const keywordList = analysis.top_keywords
          .slice(0, 10)
          .map(k => `${k.keyword} (${k.relevance_score}%)`)
          .join(', ');
        
        const splitKeywords = pdf.splitTextToSize(keywordList, contentWidth - 10);
        for (const line of splitKeywords) {
          checkPageBreak(6);
          pdf.text(line, margin + 5, yPosition);
          yPosition += 6;
        }
      }
    }

    // Footer
    const footerY = pageHeight - 15;
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text('Generated by TopicScout - Newsletter Content Generator', margin, footerY);
    pdf.text(`Page ${pdf.getCurrentPageInfo().pageNumber}`, pageWidth - margin - 20, footerY);

    return pdf.output('blob');
  }

  private processMarkdownContent(content: string): Array<{ type: string; content: string }> {
    const lines = content.split('\n');
    const processed: Array<{ type: string; content: string }> = [];

    for (let line of lines) {
      line = line.trim();
      
      if (!line) continue;

      // Handle headings
      if (line.startsWith('# ')) {
        processed.push({ type: 'heading', content: line.substring(2) });
      } else if (line.startsWith('## ')) {
        processed.push({ type: 'heading', content: line.substring(3) });
      } else if (line.startsWith('### ')) {
        processed.push({ type: 'heading', content: line.substring(4) });
      }
      // Handle bullet points
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        processed.push({ type: 'bullet', content: line.substring(2) });
      } else if (line.startsWith('• ')) {
        processed.push({ type: 'bullet', content: line.substring(2) });
      }
      // Handle bold text (simple removal for PDF)
      else if (line.includes('**')) {
        const cleanLine = line.replace(/\*\*(.*?)\*\*/g, '$1');
        processed.push({ type: 'text', content: cleanLine });
      }
      // Regular text
      else {
        processed.push({ type: 'text', content: line });
      }
    }

    return processed;
  }

  async generateAnalysisReport(
    keyword: string,
    analysis: AnalysisResult,
    options: Partial<PDFOptions> = {}
  ): Promise<Blob> {
    const opts = { ...this.defaultOptions, ...options };
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: opts.format.toLowerCase() as 'a4' | 'letter'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Analysis Report: ${keyword}`, margin, yPosition);
    yPosition += 20;

    // Date
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;
    pdf.setTextColor(0, 0, 0);

    // Sections
    const sections = [
      { title: 'Sentiment Analysis', data: analysis.sentiment },
      { title: 'Engagement Metrics', data: analysis.engagement_metrics },
      { title: 'Top Keywords', data: analysis.top_keywords },
      { title: 'Key Insights', data: analysis.key_insights },
      { title: 'Content Themes', data: analysis.content_themes },
      { title: 'Newsletter Angles', data: analysis.newsletter_angles }
    ];

    for (const section of sections) {
      // Section title
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(section.title, margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(opts.fontSize);
      pdf.setFont('helvetica', 'normal');

      // Section content
      if (typeof section.data === 'object' && !Array.isArray(section.data)) {
        for (const [key, value] of Object.entries(section.data)) {
          const text = `${key}: ${value}`;
          pdf.text(text, margin + 5, yPosition);
          yPosition += 6;
        }
      } else if (Array.isArray(section.data)) {
        for (const item of section.data) {
          const text = typeof item === 'string' ? item : 
                      typeof item === 'object' && item.keyword ? 
                      `${item.keyword} (${item.relevance_score}%)` : 
                      JSON.stringify(item);
          
          const bulletText = `• ${text}`;
          const splitText = pdf.splitTextToSize(bulletText, contentWidth - 10);
          for (const line of splitText) {
            pdf.text(line, margin + 5, yPosition);
            yPosition += 6;
          }
        }
      }
      
      yPosition += 8;
    }

    return pdf.output('blob');
  }

  downloadPDF(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
