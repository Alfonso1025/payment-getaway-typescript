
export class UserNotFoundError extends Error {
    constructor(message: string) {
        super(message); // Call the parent class (Error) constructor with the message

        this.name = 'UserNotFoundError';
    }
}
