import './App.css';
import React, { useEffect } from "react";
// import { useSelector } from 'react-redux';

import { RouterProvider } from "react-router-dom";
import { router } from './actions/routes';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
// import GlobalLoader from './components/commons/GlobalLoader'

function App() {
	// const { isLoanding } = useSelector((state) => state.navbar);
	const [, i18n] = useTranslation('common');
	
	useEffect(()=>{
		let lng = localStorage.getItem('lng');
		if(!lng) lng = 'en';
		i18n.changeLanguage(lng);
		// eslint-disable-next-line 
	},[])
	
	return (
		<div>
			{/* {!!isLoanding && <GlobalLoader />} */}
			<Toaster 
				position="top-right" 
				toastOptions={{
						duration: 5000,
					}}
			/>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
