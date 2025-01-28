import React from 'react';
import logo from '../../../assets/img/logo.svg'

type LoginContainerProps = {
  children: React.ReactNode;
};

export const LoginContainer = ({ children }: LoginContainerProps) => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center '>
        <div className='w-[480px] flex flex-col items-center'>
            <a className='mb-[46px]'>
                <img src={logo} alt="logo" className='h-[231px] w-[128px]'/>
            </a>
            {children}
        </div>
    </div>
  );
};