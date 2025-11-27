import { Request, Response } from 'express';

export const validatePostClienteRequest = (req: Request, res: Response, next: Function) => {
    const { name, email, phone } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string.' });
    }

    if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Valid email is required.' });
    }

    if (!phone || typeof phone !== 'string') {
        return res.status(400).json({ error: 'Phone is required and must be a string.' });
    }

    next();
};

export const validatePostFuncionarioRequest = (req: Request, res: Response, next: Function) => {
    const { name, position } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string.' });
    }

    if (!position || typeof position !== 'string') {
        return res.status(400).json({ error: 'Position is required and must be a string.' });
    }

    next();
};

export const validatePostOrdemServicoRequest = (req: Request, res: Response, next: Function) => {
    const { serviceType, clientId } = req.body;

    if (!serviceType || typeof serviceType !== 'string') {
        return res.status(400).json({ error: 'Service type is required and must be a string.' });
    }

    if (!clientId || typeof clientId !== 'string') {
        return res.status(400).json({ error: 'Client ID is required and must be a string.' });
    }

    next();
};