import {Request, Response} from "express";
import {register, login} from "./user.service";

export async function registerUser(req: Request, res: Response) {
    try {
        const user = await register(req.body.username, req.body.password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: "Registration failed"});
    }
}


export async function loginUser(req: Request, res: Response) {
    try {
        const token = await login(req.body.username, req.body.password);
        if (!token) {
            res.status(401).json({error: "Invalid credentials"});
            return;
        }
        res.json({token});
    } catch (error) {
        res.status(500).json({error: "Login error"});
    }
}
