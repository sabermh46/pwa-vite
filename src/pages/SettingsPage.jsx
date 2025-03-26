import React, { useState } from 'react'
import Modal from '../assets/moods/modal';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const SettingsPage = () => {
    const [settingsModal, setSettingsModal] = useState(false);
    const closeSettingsModal = () => setSettingsModal(false)
    const navigate = useNavigate()
  return (
    <>

        <header className="flex justify-between bg-background p-2 sticky top-0 z-20 boxShadow20">
        <button onClick={() => navigate(-1)} className=" flex gap-2 items-center justify-center text-primary">
            <IoIosArrowBack className='h-8 w-8'/>
            <span className='text-primary font-bold'>
                Settings
            </span>
        </button>
        
        </header>

        <div className='flex gap-3 px-4 py-8'>
            <div className='h-20 w-20 rounded-full overflow-clip bg-background boxShadow20'>

            </div>
            <div className='py-2'>
                <h2 className='text-primary text-xl font-bold'>
                    User's Full name
                </h2>
                <p className='text-secondary text-sm'>
                    You're doing good!
                </p>
            </div>
        </div>


        <div className='px-4 flex flex-col gap-2'>
            <button className='bg-background text-text block w-full text-left px-4 py-2 rounded-md shadow'
            onClick={()=>setSettingsModal(true)}>
                Theme
            </button>
            <button className='bg-background text-text block w-full text-left px-4 py-2 rounded-md shadow'>
                Personal Information
            </button>
            <button className='bg-background text-text block w-full text-left px-4 py-2 rounded-md shadow'>
                Option 3
            </button>
            <button className='bg-background text-text block w-full text-left px-4 py-2 rounded-md shadow'>
                Option 4
            </button>
            <button className='bg-background text-text block w-full text-left px-4 py-2 rounded-md shadow'>
                About Us
            </button>
            
        </div>

        {
            settingsModal && (
            <Modal 
            isVisible={settingsModal}
            onClose={closeSettingsModal}
            title={"Choose a Theme"}
            >
                <ThemeSwitcher />
            </Modal>)
        }
    </>
  )
}

export default SettingsPage