import { request } from 'https';
import { QueryParam, toQueryString } from './QueryParam';
import { parseString } from 'xml2js';

export function flickrRequest(
    method: string, 
    params: QueryParam[]
) {
    return new Promise<any>((resolve, reject) => {
        var req = request({
            protocol: 'https:',
            hostname: 'www.flickr.com',
            port: 443,
            path: '/services/rest/?' + toQueryString([
                {
                    key: 'method',
                    value: method
                },
                {
                    key: 'api_key',
                    value: process.env.FLICKR_API_KEY
                }
            ].concat(params))
        }, res => {
            res.on('data', d => {
                parseString(d as string, (err, json) => {
                    if (err)
                        reject(err);
    
                    if (json.rsp.err) {
                        console.log(json.rsp.err);
                        reject(new Error(json.rsp.err));
                    }
    
                    resolve(json);
                });
            })
        });
        
        req.on('error', error => {
            reject(error);
        });
        
        req.end();
    });
}