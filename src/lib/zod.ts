import * as z from "zod";
 
export const UserInfoSchem = (type: 0 | 1 | 2) => {
    if(!z.int().min(0).max(2).safeParse(type).success) return undefined;

    let user_info;
    if (type == 0) {
        user_info = z.object({ residence: z.string().min(10).max(50) });
    }
    else if(type == 1) {
        user_info = z.object({
            service_type: z.int().min(0).max(2),
            service_title: z.string().min(5).max(32),
            service_description: z.string().min(128).max(512),
            residence: z.string().min(10).max(50)
        });
    }
    else if(type == 2) {
        user_info = z.object({
            working_cities: z.array(z.string()).min(1).max(16),
            working_hours: z.array(z.string()).min(1).max(24)
        });
    }
    return z.object({
        type: z.int().min(0).max(2),
        first_name: z.string().max(16).min(5),
        last_name: z.string().max(16).min(5),
        phone_number: z.string().min(8).max(12),
        user_info
    });
};