
import Sidebar from '../components/Sidebar';
import '../styles/App.css'
import BaseLayout from '../components/BaseLayout';

export default function MyApp({ Component, pageProps }) {
    return (
        <BaseLayout>
        <Component {...pageProps} />
        </BaseLayout>
    );

  }