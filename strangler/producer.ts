import amqp from "amqplib/callback_api";
import { Request } from "express";

export class Producer{

    sendMessage(queue: string, pattern: string, payload: any){
        amqp.connect('amqp://localhost:5672', (error0, connection) => {
            if (error0) {
                throw error0;
            }
    
            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }
    
                channel.assertQueue(queue, {
                    durable: false
                });
    
                // Combine the message and payload into one object
                const messageWithPayload = {
                    pattern: pattern,
                    payload: payload
                };
    
                // Convert the object to a JSON string and send to the queue
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(messageWithPayload)));
            });
    
            setTimeout(() => {
                connection.close();
            }, 500);
        });
    }
}



