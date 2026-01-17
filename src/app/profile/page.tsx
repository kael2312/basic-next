'use client';

import React, {useEffect, useState} from 'react';
import {useAppContext} from "@/app/AppProvider";
import envConfig from "@/config";
import accountService from "@/services/account.service";

const Page = () => {
    const {sessionToken} = useAppContext()
    const [name, setName] = useState('')

    useEffect(() => {
        const fetchRequest = async () => {
            const res = await accountService.me(sessionToken);
            setName(res?.payload?.data?.name);
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