import { SetMetadata } from '@nestjs/common';

// 跳过jwt校验
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
