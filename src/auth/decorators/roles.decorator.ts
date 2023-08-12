import { SetMetadata } from '@nestjs/common';

// admin权限
export const IS_ADMIN_KEY = 'ADMIN';
export const Roles = () => SetMetadata(IS_ADMIN_KEY, true);
