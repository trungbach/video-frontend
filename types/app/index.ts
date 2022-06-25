export type LoadingProps = {
    load: boolean
}

export type AppProviderProps = {
    children: React.ReactNode
}

export interface ErrorResponse {
    data: Error;
    status: number;
    statusText: string;
}

export interface Error {
    timestamp: Date;
    status: number;
    error: string;
    message: string;
    path: string;
}

export type BaseResponse<T> = {
    data?: T;
    message: string;
    totalRecord?: number;
};

export type EmptyRequest = {
}


export type MessageResponse = {
    message: string;
}