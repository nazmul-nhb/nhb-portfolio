import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

const ScrollButtons = ({ containerRef }) => {
    const [showTopButton, setShowTopButton] = useState(false);
    const [showBottomButton, setShowBottomButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                setShowTopButton(scrollTop > 16);
                setShowBottomButton(scrollTop + clientHeight < scrollHeight - 16);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [containerRef]);

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`fixed right-3 text-blue-300 bottom-4 text-4xl md:text-5xl flex flex-col gap-1 z-10`}>
            {showTopButton && (
                <button onClick={scrollToTop} className={`cursor-pointer hover:text-blue-500 transition-all duration-500 animate-pulse`}>
                    <IoIosArrowDropup />
                </button>
            )}
            {showBottomButton && (
                <button onClick={scrollToBottom} className={`cursor-pointer hover:text-blue-500 animate-pulse transition-all duration-500`}>
                    <IoIosArrowDropdown />
                </button>
            )}
        </div>
    );
};

ScrollButtons.propTypes = {
    containerRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    })
};

export default ScrollButtons;
