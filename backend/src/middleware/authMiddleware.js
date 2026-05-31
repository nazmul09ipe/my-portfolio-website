import { getFirebaseAuth } from '../config/firebase.js';
import { ApiError } from '../utils/ApiError.js';

export const verifyFirebaseToken = async (req, res, next) => {
  const auth = getFirebaseAuth();
  if (!auth) {
    return next(new ApiError(503, 'Authentication service unavailable'));
  }

  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Missing or invalid authorization header'));
  }

  const token = header.split(' ')[1];

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};
