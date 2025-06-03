export const ApiEndpoints = {
  // --- Recipient ---
  RECIPIENT: {
    GET_ALL: '/Recipient/GetAllRecipients',
    BY_ID_BASE: '/Recipient/GetRecipientById',
    SEARCH_BASE: '/Recipient/SearchByKeyword',
    UPLOAD_EXCEL: '/Recipient/UploadRecipientsExcel',
    RECIPIENTS_BY_BATCH_BASE: '/Recipient/GetRecipientsByBatchId',
  },

  // --- SendMail ---
  SEND_MAIL: {
    SEND_BULK: '/SendMail/SendBulkMail',
  },

  // --- Template ---
  TEMPLATE: {
    CREATE: '/Template/CreateTemplate',
    GET_ALL: '/Template/GetAllTemplates',
    BY_ID_BASE: '/Template/GetTemplateById',
    DELETE_BASE: '/Template/DeleteTemplate',
  },

  // --- Upload ---
  UPLOAD: {
    UPLOAD_FILE: '/Upload/UploadFile',
  },
};