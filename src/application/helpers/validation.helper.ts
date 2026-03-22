import { ZodSchema } from 'zod';
import { BadRequest } from '@infra/protocols/http/exceptions/bad-request.exception';

export function validateOrThrow<T>(schema: ZodSchema<T>, input: unknown): T {
  const result = schema.safeParse(input);

  if (!result.success) {
    throw new BadRequest(
      result.error.errors.map((e) => e.message).join(', '),
      'VALIDATION_ERROR',
      { errors: result.error.errors },
    );
  }

  return result.data;
}
