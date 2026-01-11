'use client';

import React, {useEffect, useState} from 'react';
import {useAppContext} from "@/app/AppProvider";
import envConfig from "@/config";

const Page = () => {
    const {sessionToken} = useAppContext()
    const [name, setName] = useState('')

    useEffect(() => {
        const fetchRequest = async () => {
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
            setName(res.payload.data.name)
        }

        fetchRequest();

    }, [sessionToken]);
    return (
        <div>
            Hello {name}
        </div>
    );
};

export default Page;