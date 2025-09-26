import { v } from 'convex/values'
import * as argon2 from 'argon2'
import * as jose from 'jose'

import { mutation } from './_generated/server'
import { Id } from './_generated/dataModel'

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    number: v.number(),
    type: v.union(v.literal('admin'), v.literal('user')),
  },
  handler: async (ctx, args) => {
    try {
      const { name, email, password, number, type = 'user' } = args

      const hashedPassword = await argon2.hash(password)

      const user = await ctx.db.insert('users', {
        id: v.id('users') as unknown as Id<'users'>,
        name,
        email,
        password: hashedPassword,
        number,
        type,
      })

      if (!user) {
        return {
          error: 'Erro ao criar utilizador',
          success: false,
          errorLocation: 'global',
          message: '',
        }
      }

      const payload = {
        id: user,
        name,
        email,
        number,
        type,
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
      const algorithm = 'HS256'
      const expiresIn = '30d'

      const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: algorithm })
        .setExpirationTime(expiresIn)
        .sign(secret)

      return {
        success: true,
        message: `Bem vindo, ${name}!`,
        token,
      }
    } catch (_error) {
      return {
        error: 'Erro inesperado, por favor tente mais tarde',
        success: false,
        errorLocation: 'global',
        message: '',
      }
    }
  },
})
