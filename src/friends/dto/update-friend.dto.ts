import { IsOptional, IsInt } from 'class-validator';

export class UpdateFriendDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  friendId?: number;
}
