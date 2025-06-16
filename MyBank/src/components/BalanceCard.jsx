import React, { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { GetBalanceApi } from '../services/allApi';

function BalanceCard() {
    const [showBalance, setShowBalance] = useState(false);
    const [balance, setBalance] = useState("0.00");
    const [rotating, setRotating] = useState(false);

    useEffect(() => {
        const userData = sessionStorage.getItem("existinguser");
        if (userData) {
            const parseData = JSON.parse(userData);
            setBalance(parseData.balance);
        }
    }, []);

    const toggleBalanceVisibility = () => {
        setShowBalance(prev => !prev);
    };

    const handleRefresh = async () => {
        setRotating(true);
        try {
            const result = await GetBalanceApi()
            if (result.status === 200) {
                const newBalance = result.data.balance
                setBalance(newBalance)

                //updationg the session storage
                const userData = JSON.parse(sessionStorage.getItem('existinguser'))
                if (userData) {
                    userData.balance = newBalance;
                    sessionStorage.setItem("existinguser", JSON.stringify(userData))
                }

            } else {
                toast.error("Failed to fetch balance. Please try again later.");
            }

        } catch (error) {
            toast.error('Cannot refresh the balance at this moment');
        }
        setTimeout(() => setRotating(false), 500);
    };


    return (
        <div className='flex flex-col items-center justify-center gap-2 p-4'>
            <h3 className='text-green-800 text-3xl'>PRO Account</h3>
            <h3 className='text-gray-500'>By Cashvani Bank</h3>
            <h3 className='text-gray-800 text-xl'>Account Balance</h3>

            <div className='flex items-center gap-4'>
                <p className='text-3xl m-0'>₹ {showBalance ? balance : '****'}</p>
                <button className='bg-transparent border border-gray-400 rounded-full p-1' onClick={toggleBalanceVisibility}>
                    {showBalance ? <VisibilityOff /> : <Visibility />}
                </button>
                <button className="bg-transparent border border-gray-400 rounded-full p-2" onClick={handleRefresh}>
                    <RefreshIcon className={`text-gray-700 ${rotating ? 'animate-spin' : ''}`} />
                </button>
            </div>
        </div>
    );
}

export default BalanceCard;
