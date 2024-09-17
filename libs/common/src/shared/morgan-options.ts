import { Request, Response } from 'express';
import morgan from 'morgan';

// Define the skip function to exclude certain requests from being logged
export const morganOptions = (morganStyle: string) =>
  morgan(morganStyle, {
    skip: (req: Request, res: Response) => {
      const url = req.url;
      return (
        url.startsWith('/api/docs') ||
        url.endsWith('.css') ||
        url.endsWith('.js') ||
        url.endsWith('.png')
      );
    },
  });
