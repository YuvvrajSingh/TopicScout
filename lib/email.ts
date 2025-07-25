import emailjs from '@emailjs/browser';

export interface EmailData {
  to_email: string;
  to_name: string;
  subject: string;
  content: string;
  keyword: string;
}

export class EmailService {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor() {
    this.serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    this.templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    this.publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    if (!this.serviceId || !this.templateId || !this.publicKey) {
      throw new Error('EmailJS configuration is incomplete. Please check your environment variables.');
    }

    // Initialize EmailJS
    emailjs.init(this.publicKey);
  }

  async sendNewsletter(emailData: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      const templateParams = {
        to_email: emailData.to_email,
        to_name: emailData.to_name || 'Subscriber',
        subject: emailData.subject || `Newsletter Draft: ${emailData.keyword}`,
        newsletter_content: emailData.content,
        keyword: emailData.keyword,
        generated_date: new Date().toLocaleDateString(),
        from_name: 'TopicScout',
        reply_to: 'noreply@topicscout.com'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Newsletter sent successfully!'
        };
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`);
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email'
      };
    }
  }

  async sendNewsletterWithAttachment(
    emailData: EmailData, 
    pdfBlob: Blob
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Convert PDF blob to base64
      const reader = new FileReader();
      const pdfBase64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data URL prefix
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(pdfBlob);
      });

      const templateParams = {
        to_email: emailData.to_email,
        to_name: emailData.to_name || 'Subscriber',
        subject: emailData.subject || `Newsletter Draft: ${emailData.keyword}`,
        newsletter_content: emailData.content,
        keyword: emailData.keyword,
        generated_date: new Date().toLocaleDateString(),
        from_name: 'TopicScout',
        reply_to: 'noreply@topicscout.com',
        attachment_name: `${emailData.keyword}_newsletter.pdf`,
        attachment_content: pdfBase64
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Newsletter with PDF attachment sent successfully!'
        };
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`);
      }
    } catch (error) {
      console.error('Email with attachment sending failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email with attachment'
      };
    }
  }

  validateEmailAddress(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async sendTestEmail(): Promise<{ success: boolean; message: string }> {
    try {
      const testEmailData: EmailData = {
        to_email: 'test@example.com',
        to_name: 'Test User',
        subject: 'TopicScout Test Email',
        content: `
# Test Newsletter

This is a test email to verify EmailJS integration.

## Features Tested:
- Email delivery
- Template formatting
- Content rendering

Generated on: ${new Date().toLocaleDateString()}
        `,
        keyword: 'test'
      };

      return await this.sendNewsletter(testEmailData);
    } catch (error) {
      return {
        success: false,
        message: 'Test email configuration failed'
      };
    }
  }
}
