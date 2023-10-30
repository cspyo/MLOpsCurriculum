import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!isUUID(value, 4)) {
      throw new BadRequestException('Invalid UUID');
    }
    return value;
  }
}
