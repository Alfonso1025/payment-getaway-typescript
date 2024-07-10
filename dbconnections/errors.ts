export class DbConnectionError extends Error {
    constructor(message: string) {
       
        const concatMessage = `A db error occurred: ${message}`;

        super(concatMessage);

        // Set the name of the error
        this.name = 'DbConnectionError';
    }
}

export class QueryError extends Error {
    constructor(message: string) {
       
        const concatMessage = `An error ocured while executing the db query: ${message}`;

        super(concatMessage);

        // Set the name of the error
        this.name = 'QuerySintaxError';
    }
}

