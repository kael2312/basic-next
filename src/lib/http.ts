import envConfig from "@/config";

type CustomOptions = RequestInit & {
    baseUrl?: string | undefined;
};

class HttpError extends Error {
    status: number;
    payload: any;

    constructor({status, payload}: { status: number; payload: any }) {
        super("Http Error");
        this.status = status;
        this.payload = payload;
    }
}

class SessionToken {
    private token = '';

    get value() {
        return this.token;
    }

    set value(newToken: string) {
        if (typeof window === "undefined") {
            throw new Error("Cannot set session token on server side");
        }
        this.token = newToken;
    }
}
export const sessionToken = new SessionToken();

const request = async <T>(
    method: "GET" | "POST" | "PUT" | "DELTE",
    url: string,
    options?: CustomOptions | undefined,
) => {
    const body = options?.body ? JSON.stringify(options?.body) : undefined;
    const baseHeaders = {
        "Content-Type": "application/json",
    };

    // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig
    const baseUrl =
        options?.baseUrl === undefined
            ? envConfig.NEXT_PUBLIC_API_ENDPOINT
            : options.baseUrl;

    const fullUrl = url.startsWith("/")
        ? `${baseUrl}${url}`
        : `${baseUrl}/${url}`;

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        body,
        method,
    });

    const payload: T = await res.json();
    const data = {
        status: res.status,
        payload,
    };

    if (!res.ok) throw new HttpError(data);
    return data;
};

const http = {
    get<T>(url: string, options?: Omit<CustomOptions, "body"> | undefined) {
        return request<T>("GET", url, options);
    },

    post<T>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined,
    ) {
        return request<T>("POST", url, {...options, body});
    },

    put<T>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined,
    ) {
        return request<T>("PUT", url, {...options, body});
    },

    delete<T>(
        url: string,
        body: any,
        options?: Omit<CustomOptions, "body"> | undefined,
    ) {
        return request<T>("DELTE", url, options);
    },
};

export default http;
