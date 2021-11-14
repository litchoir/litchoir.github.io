export interface ValidationStatus {
    message?: string,
    isError: boolean
}

export enum InputType {
    Text = 'text',
    Image = 'image'
}