import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  friendId: number;
}
