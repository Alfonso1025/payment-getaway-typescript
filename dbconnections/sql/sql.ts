import mysql from 'mysql2';
import { DbConnectionError } from '../errors';


function connectToMysql(){
  const db = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
        
  });
  
  db.connect((err) => {
    if (err) {
      
      console.error('Error connecting to MySQL:', err.message);
     
      
    } else {
      console.log('Connected to MySQL server');
    }
  });
  
  return db
}
const db = connectToMysql()
export default db;
