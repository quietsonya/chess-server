import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/models/users.model'
import 'dotenv/config'
import { TokenPayload } from 'src/auth/types/token-payload'
import { UserFromRequest } from 'src/auth/types/user-from-request'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-token'
) {
    constructor(
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
        })
    }

    async validate(req: Request, payload: TokenPayload): Promise<UserFromRequest> {
        const refreshToken = req.body.refreshToken
        if (!refreshToken) {
            throw new BadRequestException({ message: 'Invalid refresh token' })
        }
        const user: User = await this.usersService.getUserById(payload.id)
        const { id, email, isAdmin, username }: UserFromRequest = user
        return { id, email, isAdmin, username }
    }
}
