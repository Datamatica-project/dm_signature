export const SIGNATURE_IMAGE_WIDTH = 610;

export interface ImageSize {
  width: number;
  height: number;
}

export function calculateSignatureImageSize(content: ImageSize): ImageSize {
  return {
    width: SIGNATURE_IMAGE_WIDTH,
    height: Math.round((content.height * SIGNATURE_IMAGE_WIDTH) / content.width),
  };
}
