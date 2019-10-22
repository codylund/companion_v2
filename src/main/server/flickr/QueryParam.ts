export interface QueryParam {
    key: string,
    value: string
}

export function toQueryString(params: QueryParam[]) {
    return params
        .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&');
}