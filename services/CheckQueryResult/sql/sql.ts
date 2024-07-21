import { QueryResult, ResultSetHeader } from "mysql2"
import { ICheckQryResult } from "../ICheckQryResult";
 
export class CheckQryResultSQL implements ICheckQryResult<QueryResult | ResultSetHeader> {
    isThereInsertId(result: QueryResult): boolean {
        return 'insertId' in result;
    }

    isThereData(result: ResultSetHeader): boolean {
        if (Array.isArray(result)) {
            return result.length > 0;
        }
        return false;
    }

    areThereAffectedRows(result:ResultSetHeader): boolean {
        return 'affectedRows' in result && result.affectedRows > 0;
    }
}
 