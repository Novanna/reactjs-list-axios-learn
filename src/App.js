import React, {Suspense, lazy, Fragment} from 'react';
import Loader from 'react-loader-spinner';
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/styles";

const Main = lazy(() => import('../src/Layout/Base'));
const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <div className="App">
                    <Suspense fallback={
                        <div className="loader-container">
                            <div className="loader-container-inner">
                                <div className="text-center">
                                    <Loader type="semi-circle-spin"/>
                                </div>
                            </div>
                        </div>
                    }>
                        <Main/>
                    </Suspense>
                </div>
            </Fragment>
        </ThemeProvider>
    );
}

export default App;