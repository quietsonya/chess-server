import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from 'src/users/models/users.model'
import { Chat } from './chats.model'

@Table({ tableName: 'chat-user' })
export class ChatUser extends Model<ChatUser> {

    @ApiProperty({ type: String, format: 'uuid', example: 'ff1a1780-aff9-45c9-8025-714fb78b2cb1' })
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
        id: string



    @ApiProperty({ type: String, format: 'uuid', example: 'ff1a1780-aff9-45c9-8025-714fb78b2cb1' })
    @Column({ type: DataType.UUID, allowNull: false })
    @ForeignKey(() => User)
        userId: string

    @ApiPropertyOptional({ type: User })
    @BelongsTo(() => User)
        user: User



    @ApiProperty({ type: String, format: 'uuid', example: 'ff1a1780-aff9-45c9-8025-714fb78b2cb1' })
    @Column({ type: DataType.UUID, allowNull: false })
    @ForeignKey(() => Chat)
        chatId: string

    @ApiPropertyOptional({ type: Chat })
    @BelongsTo(() => Chat)
        chat: Chat

}
