export interface ICheckQryResult<T> {
    isThereInsertId(result: T): boolean;
    isThereData(result: T): boolean;
    areThereAffectedRows(result: T): boolean;
}
