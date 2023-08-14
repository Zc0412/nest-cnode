import { IsNotEmpty } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  tab: string;

  @IsNotEmpty()
  content: string;
}
