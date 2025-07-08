import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'

export interface RequestComUsuario extends Request {
    usuario?: string | jwt.JwtPayload;
}

export const authMiddleware = (req: RequestComUsuario, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo_padrao');
    
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
    return;
  }
}