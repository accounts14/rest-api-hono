import { verifyToken } from '../utils/jwt';
export const authMiddleware = async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Token required' }, 401);
    }
    const token = authHeader.substring(7); // Remove 'Bearer '
    try {
        const decoded = verifyToken(token);
        c.set('user', decoded);
        await next();
    }
    catch (err) {
        return c.json({ error: 'Invalid or expired token' }, 401);
    }
};
