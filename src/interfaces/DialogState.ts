export default interface DialogState {
    status?: boolean;
    type?: any;
    closeable?: boolean;
    text?: string;
    buttons?: Array<any>;
    options?: Array<any>;
    maxLength?: number;
    value?: any;
    onSubmit?: (p?: any) => void;
    onClose?: (p?: any) => void;
}