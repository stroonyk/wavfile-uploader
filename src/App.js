import Landing from './pages/Landing';
import WavProvider from './store/WavProvider';

const App = () => {
    return (
        <>
            <div className="App">
                <WavProvider>
                    <Landing />
                </WavProvider>
            </div>
        </>
    );
};

export default App;
