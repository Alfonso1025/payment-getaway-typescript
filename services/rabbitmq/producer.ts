import amqp from "amqplib/callback_api.js";

export function sendMessage(msg: string) {
    console.log('hello world')
    amqp.connect('amqp://localhost:5673', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
 
            const queue = 'inventoryQueue';

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });

        setTimeout(function() {
            connection.close();
        }, 500);
    });
}


