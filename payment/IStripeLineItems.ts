export interface ILineItems{
    price_data: {
        currency : string, 
        product_data : {
                name: string
        },
        unit_amount : number
       },
    quantity : number
}
