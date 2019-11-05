import { RequestHandler } from 'express';
import { HandlerProvider } from './HandlerProvider';
import { MailChimpClient } from '../data/MailChimpClient';

export class SubscriptionHandlerProvider implements HandlerProvider {

    getRoute(): string {
        return "/api/subscribe";
    }
    
    getHandler(): RequestHandler {
        return (req, res) => {
            var email = req.body["email"] as string;
            if (!email) {
                res.status(400).send("Must provide an email parameter.")
                return;
            }

            MailChimpClient.addEmail(email);
            res.status(200).send();
        };
    }
}