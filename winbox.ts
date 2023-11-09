import dynamic from 'next/dynamic';
const WinBox = dynamic(() => import('react-winbox'), { ssr: false });
export default WinBox;
