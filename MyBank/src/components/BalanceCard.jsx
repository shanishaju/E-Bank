import React, { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { GetBalanceApi } from '../services/allApi';

function BalanceCard() {
    const [showBalance, setShowBalance] = useState(false);
    const [loading, setLoading] = useState(false);

    const userData = sessionStorage.getItem("existinguser");
    const parseData = JSON.parse(userData);
    const balance = parseData.balance
    console.log("balance", balance);


    const toggleBalanceVisibility = () => {
        setShowBalance(prev => !prev);
    };

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const result = await GetBalanceApi()
            if (result.status === 200) {
                const newBalance = result.data.balance


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
        } finally {

            setLoading(false)
        }
    };


    return (
        <div className='flex flex-col items-center justify-center gap-2 p-4 shadow-lg rounded-4xl w-[400px]  '>
            <h3 className='text-green-900 text-3xl'>PRO Account</h3>
            <h3 className='text-gray-500'>By Cashvani Bank</h3>
            <h3 className='text-gray-800 text-xl'>Account Balance</h3>

            <div className='flex items-center gap-4'>
                <p className='text-3xl m-0'>₹ {showBalance ? balance : '****'}</p>
                <button className='bg-transparent border border-gray-400 rounded-full p-2' onClick={toggleBalanceVisibility}>
                    {showBalance ? <VisibilityOff /> : <Visibility />}
                </button>
                <button className="bg-transparent border border-gray-400 rounded-full p-2" onClick={handleRefresh}>
                    <RefreshIcon className={`text-gray-700 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>
        </div>
    );
}

export default BalanceCard;
