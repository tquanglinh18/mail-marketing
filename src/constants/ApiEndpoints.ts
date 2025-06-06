export const ApiEndpoints = {
  // --- Recipient ---
  RECIPIENT: {
    GET_ALL: "/Recipient/GetAllRecipients",
    BY_ID_BASE: "/Recipient/GetRecipientById",
    SEARCH_BASE: "/Recipient/SearchByKeyword",
    UPLOAD_EXCEL: "/Recipient/UploadRecipientsFromExcel",
    RECIPIENTS_BY_BATCH_BASE: "/Recipient/GetRecipientsByBatchId",
    GET_ALL_BATCH: "/Recipient/GetAllBatch",
  },

  // --- SendMail ---
  SEND_MAIL: {
    SEND_MAIL_WITH_MAILGUN: "/SendMail/SendBulkMailWithMailgun",
    SEND_MAIL_WITH_SENDGRID: "/SendMail/SendBulkMailWithSendGrid",
  },

  // --- Template ---
  TEMPLATE: {
    CREATE: "/Template/CreateTemplate",
    GET_ALL: "/Template/GetAllTemplates",
    BY_ID_BASE: "/Template/GetTemplateById",
    DELETE_BASE: "/Template/DeleteTemplate",
  },

  // --- Upload ---
  S3AWS: {
    UPLOAD_FILE: "/S3AWS/UploadFile",
    GET_FILE_BUCKET: "/S3AWS/ListBucketFiles",
  },
};
