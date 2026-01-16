import { verifyToken } from '../utils/jwt.js';
export const authMiddleware = async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Token required' }, 401);
    }
    const token = authHeader.substring(7);
    try {
        const decoded = verifyToken(token);
        c.set('user', {
            id: decoded.id,
            email: decoded.email,
        });
        await next();
    }
    catch {
        return c.json({ error: 'Invalid or expired token' }, 401);
    }
};
