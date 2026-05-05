export interface GalleryImage {
    id: string;
    filename: string;
    url: string;
    isLiked: boolean;
}

export interface Gallery {
    uuid: string;
    title: string;
    description: string;
    createdAt: string;
    images: GalleryImage[];
    zipFileUrl: string;
    zipFileSize: string;
    pin?: string;
    photographerSlug?: string;
    clientPhone?: string;
}

export interface CreateGalleryData {
    title: string;
    description: string;
    clientPhone?: string;
    images: Omit<GalleryImage, 'isLiked'>[];
    files?: File[];
    zipFileUrl: string;
    zipFileSize: string;
    zipFileBlob?: File;
    pin?: string;
}
