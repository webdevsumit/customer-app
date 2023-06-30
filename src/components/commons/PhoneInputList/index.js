import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

function PhoneInputList({
    phoneNumbers,
    setPhoneNumbers,
    primaryColor='var(--store-primary)'
}) {

    const [t, ] = useTranslation('phoneInputList');

    const onPhoneNumberChange = (i, { target: { name, value } }) => {
        let oldPhoneNumbers = [...phoneNumbers];
        if(name === 'is_whatsapp'){
            oldPhoneNumbers[i][name] = value==='YES';
        }else{
            oldPhoneNumbers[i][name] = value;
        }
		setPhoneNumbers(oldPhoneNumbers);
	}

	const addPhoneNumberBox = () => {
		setPhoneNumbers([...phoneNumbers, {
            'id': null,
			'number': '',
            'type': 'MOBILE',
            'is_whatsapp': true,
		}])
	}

	const removePhoneNumberBox = (i) => {
		let oldPhoneNumbers = [...phoneNumbers];
		oldPhoneNumbers.splice(i, 1);
		setPhoneNumbers(oldPhoneNumbers);
	}

    return (
        <div>
            <label className='PhoneInputList-input-label' style={{color:primaryColor}}>
                Contact Numbers
            </label>
            <div className='PhoneInputList-input-div-div'>
                {phoneNumbers.map(({
                    number,
                    // type,
                    is_whatsapp,
                }, i) =>
                    <div key={i} className='PhoneInputList-address'>
                        <p onClick={() => removePhoneNumberBox(i)} className='PhoneInputList-address-remove-btn'>X</p>
                        <div className='PhoneInputList-inline-inputs'>

                            <div className='PhoneInputList-inline-inputs1'>
                                <label className='PhoneInputList-sub-input-label' style={{color:primaryColor}}>
                                    {t("input-labels.phoneNumber")}
                                </label><br />
                                <input
                                    className='PhoneInputList-number-input'
                                    name='number'
                                    value={number}
                                    type="tel"
                                    placeholder="Enter Full Length"
                                    onChange={e => onPhoneNumberChange(i, e)}
                                />
                            </div>
                            <div className='PhoneInputList-inline-inputs2'>
                                <label className='PhoneInputList-sub-input-label' style={{color:primaryColor}}>
                                    {t("input-labels.whatsappNum")}
                                </label><br />
                                <select
                                    className='PhoneInputList-type-input'
                                    name='is_whatsapp'
                                    value={is_whatsapp? "YES": "NO"}
                                    onChange={e => onPhoneNumberChange(i, e)}
                                >
                                    <option value="">{t("select-optinos.empty")}</option>
                                    <option value="YES">{t("select-optinos.YES")}</option>
                                    <option value="NO">{t("select-optinos.NO")}</option>
                                </select>
                            </div>
                        </div>
                    </div>)}
                <div>
                    <p className='PhoneInputList-contact-add-btn' onClick={addPhoneNumberBox}>{t("button.add")}</p>
                </div>
            </div>
        </div>
    )
}

export default PhoneInputList