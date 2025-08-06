import type { Schema, Struct } from '@strapi/strapi';

export interface ImgImage extends Struct.ComponentSchema {
  collectionName: 'components_img_images';
  info: {
    displayName: 'image';
  };
  attributes: {};
}

export interface TextText extends Struct.ComponentSchema {
  collectionName: 'components_text_texts';
  info: {
    displayName: 'text';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'img.image': ImgImage;
      'text.text': TextText;
    }
  }
}
