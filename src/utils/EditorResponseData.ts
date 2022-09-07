import { EditorResponse } from '../../types/CommonTypes';

export class EditorResponseData<T> implements EditorResponse<T> {
    success: boolean;
    status: number;
    data?: string;
    error?: string;

    constructor(success: boolean, status: number, data?: string, error?: string) {
        this.success = success;
        this.status = status;
        this.data = data;
        this.error = error;
    }
    parseData() {
        if (this.success && this.data) {
            return JSON.parse(this.data) as T;
        } else {
            return '' as unknown as T;
        }
    }
}
