import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import tabs from '../../utils/tabs';

const BottomNavigation = () => {
    const location = useLocation().pathname;
    const [plusIconClicked, setPlusIconClicked] = useState(false);



    return (
        <>
            {/* Overlay when plus icon is clicked */}
            <div
                className={`fixed bg-black/50 left-0 top-0 right-0 bottom-0 z-[10] transition-opacity duration-300 ${
                    plusIconClicked ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setPlusIconClicked(false)}
            ></div>


            <div
                className={`fixed right-4 bottom-5 z-[20]`}
                onClick={() => setPlusIconClicked((prev) => !prev)}
            >
                <FaPlus className={`h-14 w-14 p-3 rounded-full bg-background border border-primary boxShadow20 duration-500 text-primary ${plusIconClicked ? "rotate-[135deg]" : "rotate-0"}`} />


                <div className={`absolute rounded-full bg-background -z-10 duration-500 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 ${plusIconClicked ? "scale-100 rotate-0" : "scale-0 -rotate-45"}`}>
                    <div className="h-12 w-12 bg-green-400 rounded-full absolute left-[20px] top-[165px]">

                        <span className="absolute left-1/2 -translate-x-1/2 -bottom-5">
                            Label
                        </span>
                    </div>
                    <div className="h-12 w-12 bg-green-400 rounded-full absolute left-[040px] top-[90px]">

                        <span className="absolute left-1/2 -translate-x-1/2 -bottom-5">
                            Label
                        </span>
                    </div>
                    <div className="h-12 w-12 bg-green-400 rounded-full absolute left-[090px] top-[40px]">

                        <span className="absolute left-1/2 -translate-x-1/2 -bottom-5">
                            Label
                        </span>
                    </div>
                    <div className="h-12 w-12 bg-green-400 rounded-full absolute left-[165px] top-[20px]">

                        <span className="absolute left-1/2 -translate-x-1/2 -bottom-5">
                            Label
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className='fixed bottom-5 left-0 w-full flex justify-between items-center pr-5 z-[9]'>
                
                {/* Left Navigation (Tabs) */}
                <div
                    className="flex rounded-r-full bg-background border border-primary boxShadow20 text-primary z-20 gap-4 px-2 py-2"
                >
                    {/* eslint-disable-next-line no-unused-vars */}
                    {tabs.map(({ name, Icon, href }) => (
                        <Link
                            key={name}
                            to={href}
                            className={`hover:bg-primary hover:text-surface rounded-full p-2 transition-all ${
                                location === href ? "bg-primary text-surface" : "text-primary bg-transparent"
                            }`}
                        >
                            <Icon className="h-6 w-6" />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BottomNavigation;
