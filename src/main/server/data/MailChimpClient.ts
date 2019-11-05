import { request } from 'https';


export class MailChimpClient {

    private static readonly API_VERSION = "3.0";

    static addEmail(email: string): Promise<any> {
        // See https://mailchimp.com/developer/guides/manage-subscribers-with-the-mailchimp-api/.
        var path = `/${ this.API_VERSION }/lists/2ee210e881/members`;
        var body = {
            email_address: email,
            status: "subscribed"
        };

        return this.mailchimpRequest("POST", path, body);
    }

    static mailchimpRequest(method: string, path: string, body?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var req = request({
                protocol: 'https:',
                method: method,
                hostname: 'us20.api.mailchimp.com',
                port: 443,
                path: path,
                headers: this.getAuthorizationHeader(),
            }, res => {
                resolve(res);
            });
            
            if (body) {
                req.write(JSON.stringify(body));
            }

            req.on('error', error => {
                reject(error);
            });
            
            req.end();
        });
    }

    private static getAuthorizationHeader() {
        return {
            'Authorization': 'Basic ' + Buffer.from(`any:${ process.env.MAILCHIMP_API_KEY }`).toString('base64')
        }
    }
}