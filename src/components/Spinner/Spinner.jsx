import doubleRing from '../../assets/di-ring.svg';

const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img className='w-48' src={doubleRing} alt="Loading..." />
        </div>
    );
};

export default Spinner;