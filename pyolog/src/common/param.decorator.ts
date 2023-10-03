import { Param } from '@nestjs/common';
import { UUIDValidationPipe } from './validation.pipe';

export const UUIDParam = (param: string) => Param(param, UUIDValidationPipe);
