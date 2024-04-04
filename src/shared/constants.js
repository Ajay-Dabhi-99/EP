// export const imageType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
export const imageType = ['image/avif', 'image/webp', 'image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/vnd.microsoft.icon', 'image/tiff', 'image/svg+xml'];
// export const videoType = ['video/mp4', 'video/webm', 'video/3gpp','video/quicktime'];
export const videoType = ['video/x-f4v', 'video/x-matroska', 'video/x-msvideo', 'video/mp4', 'video/webm', 'audio/webm', 'video/3gpp', 'audio/3gpp', 'video/3gpp2', 'audio/3gpp2', 'video/x-ms-wmv', 'video/quicktime', 'video/MP2T', 'video/x-flv'];

export const documentType = ['application/zip', 'text/plain', 'application/vnd.rar', 'application/pdf', 'text/csv',
    'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
    'application/x-tar', 'application/vnd.oasis.opendocument.presentation',
    'application/vnd.oasis.opendocument.spreadsheet', 'application/vnd.oasis.opendocument.text',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/x-7z-compressed'
];

// regex
export const onlyDigits = new RegExp(/^\d+$/);