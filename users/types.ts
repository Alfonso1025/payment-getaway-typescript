import { ShippingAddress } from "../shippingAddress/types"

export type User= {
    user_id? : number
    firstName : string
    lastName : string
    email : string
    user_password : string
    preferedAddress? : ShippingAddress|number
}