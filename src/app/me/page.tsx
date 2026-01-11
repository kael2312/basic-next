import React from 'react';
import envConfig from "@/config";
import {cookies} from "next/headers";

const MeProfile = async () => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    console.log('cookieStore: ', sessionToken);
    const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken}`
        },
    })
        .then(async (res) => {
            const payload = await res.json()
            const data = {
                status: res.status,
                payload
            }
            if (!res.ok) {
                throw data
            }
            return data
        });


    return (
        <div>
            {res.payload.data.name}
        </div>
    );
};

export default MeProfile;
