import React from 'react'
import { useTranslation } from 'react-i18next';
import './style.css'

function FancyTextMessage() {
	const [t,] = useTranslation('landing');
	return (
		<div className='FancyTextMessage'>
			<div className="FancyTextMessage_Iam">
				<p>You can </p>
				<b>
					<div className="innerIam">
						{t("Landing-FancyTextMessage.line1")}<br />
						{t("Landing-FancyTextMessage.line2")}<br />
						{t("Landing-FancyTextMessage.line3")}<br />
						{t("Landing-FancyTextMessage.line4")}<br />
						{t("Landing-FancyTextMessage.line5")}
					</div>
				</b>
			</div>
		</div>
	)
}

export default FancyTextMessage