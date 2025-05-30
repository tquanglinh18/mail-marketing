export interface EmailTemplate {
  templateId: number;
  templateName: string;
  htmlContent: string;
  imageStorageType: string | null;
  createdDate: string;
  createdBy: string | null;
}

export interface TemplateImage {
  name: string;
  data: string;
  isBase64: boolean;
}

export interface UploadBatch {
  batchId: number;
  batchName: string;
  uploadedFileName: string | null;
  uploadDate: string;
  uploadedBy: string | null;
  emailRecipients?: EmailRecipient[];
}

export interface EmailRecipient {
  recipientId: number;
  batchId: number;
  recipientName: string | null;
  recipientEmail: string;
  customDataJson: string;
  uploadBatch?: UploadBatch | null;
}

export interface EmailLog {
  logId: number;
  recipientId: number;
  templateId: number;
  sentDate: string;
  isSuccess: boolean;
  errorMessage: string | null;

  emailRecipient?: EmailRecipient | null;
  emailTemplate?: EmailTemplate | null;
}

export interface SendMailRequest {
  templateId: number;
  uploadBatchId: number;
  customSubject?: string | null;
  globalMergeFields?: Record<string, string> | null;
  images?: TemplateImage[] | null;
  isSandbox?: boolean;
}

export interface SendGridRecipient {
  email: string;
  name: string | null;
  substitutions: Record<string, string>;
}

export interface ResponseDTO<T> {
  code: number;
  data: T | null;
  message: string;
  isSuccessed: boolean;
}
