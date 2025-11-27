import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    private authService = new AuthService();
    

    login = async (req: Request, res: Response) => {
        const { email, senha } = req.body;

        try {
            const user = await this.authService.login(email, senha);
            res.status(200).json({ message: "Login bem-sucedido", user });

        } catch (err: any) {
            res.status(401).json({ message: err.message });
        }
    };
}
