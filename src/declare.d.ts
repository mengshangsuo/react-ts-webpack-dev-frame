import en from './i18n/lang/zh';
import zh from './i18n/lang/en';

// 声明图片类型
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

// 声明less类型
declare module '*.less';

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof zh & keyof typeof en;
    }
  }
}
