export type UserInfo = {
    type: 0 | 1 | 2; // 0 buyer | 1 seller | 2 courier
    first_name: string;
    last_name: string;
    phone_number: string;
    user_info: SellerInfo | BuyerInfo | CourierInfo | undefined;
};

export type BuyerInfo = {
    residence: string;
}

export type SellerInfo = {
    service_type: 0 | 1 | 2; // 0 Service | 1 Labour | 2 Product
    service_title: string; // "Iphone reparation"
    service_description: string; // "I repare iphones that are between Xs and 15 pro"
    residence: string | undefined;
}

export type CourierInfo = {
    working_cities: string[];
    working_hours: number[];
}