import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {

    const {getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages} = useContext(ChatContext);

    const {logout, onlineUsers} = useContext(AuthContext);

    const [input, setInput] = useState(false);

    const navigate = useNavigate();

    const filteredUsers = input ? (users || []).filter(user => user.fullName.toLowerCase().includes(input.toLowerCase())) : (users || []);

    useEffect(() => {
        getUsers();
    }, [onlineUsers, getUsers]);

  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>
        <div className='pb-5'>
            <div className="flex justify-between items-center">
                <img src={assets.logo} alt="logo" className='max-w-40' />
                <div className="relative py-2 group">
                    <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />
                    <div className='absolute top-full right-0  z-0 w-32 p-5 text-gray-100 border border-gray-600 rounded-md hidden group-hover:block'>
                        <p onClick={() => navigate(`/profile`)} className='cursor-pointer text-sm'>Edit Profile</p>
                        <hr className='my-2 border-t border-gray-500' />
                        <p onClick={() => logout()} className='cursor-pointer text-sm'>Logout</p>
                    </div>
                </div>  
            </div>
            <div className='rounded-full bg-[#282142] flex items-center gap-2 py-3 px-4 mt-5'>
                <img src={assets.search_icon} alt="Search" className='w-3' />
                <input onChange={(e) => setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white text-sm placeholder-gray-400 flex-1' placeholder='Search User...' />
            </div>
        </div>
        <div className='flex flex-col gap-4'>
            {filteredUsers.map((user, index) => (
                <div key={index} onClick={() => { setSelectedUser(user); setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })) } } className={`relative flex items-center gap-2 p-2 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]/50'}`}>
                    <img src={user?.profilePic || assets.avatar_icon} alt={user.name} className='w-[35px] aspect-[1/1] rounded-full' />
                    <div className='flex flex-col'>
                        <p>{user.fullName}</p>
                        {
                            onlineUsers.includes(user._id)
                            ? <span className='text-green-500 text-xs'>Online</span>
                            : <span className='text-red-500 text-xs'>Offline</span>
                        }
                    </div>
                    {unseenMessages[user._id] > 0 && <p className='absolute right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar;