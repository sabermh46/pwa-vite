import { IoCloseCircleOutline } from 'react-icons/io5'

const Modal = ({
    children,
    isVisible,
    onClose,
    customClass,
    title,
    customInnerClass
}) => {
    if (!isVisible) return null

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div
                className={`bg-background dark:bg-darkMode-bg_dark flex flex-col justify-between rounded-lg z-50 w-[90%] max-w-[600px] max-h-[90%] ${customClass}`}
            >
                <div
                    className={`flex justify-between items-center boxShadow20 px-6 pb-3 pt-3 rounded-t-lg text-primary-500 `}
                >
                    <div>
                        <div className='font-extrabold text-lg text-text'>
                            {title || 'Title Here'}
                        </div>
                    </div>

                    <div onClick={onClose}
                            className='top-2 right-2'>
                        <IoCloseCircleOutline className='text-[25px] dark:text-darkMode-text_dark text-text' />
                    </div>
                </div>

                <div
                    className={`p-6 overflow-y-auto scrollbar-none scrollbar-thumb-rounded-md scrollbar-thumb-gray-200 scrollbar-track-transparent ${customInnerClass}`}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
