export default interface Setting {
    textNode: string;
    component?: any;
    type: string;
    value?: any;
    color?: string;
    onClick?: () => void;
    onChange?: (value: any) => void;
}