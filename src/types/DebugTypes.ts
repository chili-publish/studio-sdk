enum CallStatus {
    loading = 'loading',
    success = 'success',
    error = 'error',
}

type DebugVar = {
    name: string;
    type: string;
};
type ApiResponse = {
    status: number;
    error: string;
    data: string;
    type: string;
};
export type DebugData = {
    title: string;
    vars: DebugVar[];
    response: ApiResponse;
    startTime: Date;
    endTime: Date;
    incoming: boolean;
    status: CallStatus;
};
