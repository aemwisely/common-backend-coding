import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
  credentials: true,
  optionsSuccessStatus: 204,
  origin: (origin, callback) => {
    return callback(null, true);
  },
  methods: 'GET,PUT,PATCH,POST,DELETE',
};
