
export type ProductImage = {
    image_name: string;
    url : string | null
    isMain: boolean;
    image_id : number
  }

export type Product= {
    product_id : number
    product_name : string
    price : number
    category : number
    product_description : string
    product_images : ProductImage[] | null
    qty : number
}

export type insertedId = number




