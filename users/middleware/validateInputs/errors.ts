export class MissingCredentials extends Error {
    constructor(message: string) {
        
        super(message);
        
        // Set the name property of the error to 'MissingCredentials'
        this.name = 'MissingCredentials';
    }
}

export class MissingRequiredField extends Error {
    constructor(message: string) {
        
        super(message);
        
        // Set the name property of the error to 'MissingCredentials'
        this.name = 'MissingRequiredFiel';
    }
}
