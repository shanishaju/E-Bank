import React from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react'



function BalanceCard() {
    const [showBalance, setShowBalance] = useState(false);
    const [balance, setBalance] = useState("0.00");
    useEffect(() => {
        const userData = sessionStorage.getItem("existinguser");
        // console.log(userData);

        if (userData) {
            const parseData = JSON.parse(userData)
            // console.log(parseData.balance);
            setBalance(parseData.balance)
        }

    }, []);

    const toggleBalanceVisibility = () => {
        setShowBalance(prev => !prev);
    };


    return (
        <div className='flex flex-col items-center justify-center gap-2 p-4'>
            <h3 className='text-green-800 text-3xl'>PRO Account</h3>
            <h3 className='text-gray-500'>By Cashvani Bank</h3>
            <h3 className='text-gray-800 text-xl'>Account Balance</h3>

            <div className='flex items-center gap-2'>
                <p className='text-3xl m-0'>₹ {showBalance ? balance: '****'}</p>
                <button className='bg-transparent border-0' onClick={toggleBalanceVisibility}>
                    {showBalance ? <VisibilityOff />: <Visibility/>}
                </button>
            </div>
        </div>
    )
}

export default BalanceCard
