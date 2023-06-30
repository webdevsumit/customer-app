import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';

function AddressInputList({
    addresses,
    setAddresses,
    primaryColor='var(--store-primary)'
}) {

    const [t, ] = useTranslation('addressInputList');

    const onAddressChange = (i, { target: { name, value } }) => {
		let oldAddresses = [...addresses];
		oldAddresses[i][name] = value;
		setAddresses(oldAddresses);
	}

	const addAddressBox = () => {
		setAddresses([...addresses, {
            'id': null,
			'cep_or_pincode': '',
			'house_number': '',
			'street': '',
			'landmark': '',
			'city': '',
			'state': '',
			'country': addresses[0].country,
			// 'latitude': '',
			// 'longtude': '',
		}])
	}

	const removeAddressBox = (i) => {
		let oldAddresses = [...addresses];
		oldAddresses.splice(i, 1);
		setAddresses(oldAddresses);
	}

    return (
        <div>
            <label className='AddressInputList-input-label' style={{color:primaryColor}}>
                {t("input-labels.addresses")}
            </label>
            <div className='AddressInputList-input-div-div'>
                {addresses.map(({
                    house_number,
                    street,
                    landmark,
                    cep_or_pincode,
                    city,
                    state,
                    country
                }, i) =>
                    <div key={i} className='AddressInputList-address'>
                        {addresses.length>1 && <p onClick={() => removeAddressBox(i)} className='AddressInputList-address-remove-btn'>X</p>}
                        <div>
                            <label className='AddressInputList-sub-input-label' style={{color:primaryColor}}>
                                {t("input-labels.flatNo")}
                            </label><br />
                            <input
                                className='AddressInputList-house_number-input'
                                name='house_number'
                                value={house_number}
                                onChange={e => onAddressChange(i, e)}
                            />
                        </div>
                        <div>
                            <label className='AddressInputList-sub-input-label' style={{color:primaryColor}}>
                                {t("input-labels.street")}
                            </label><br />
                            <input
                                className='AddressInputList-street-input'
                                name='street'
                                value={street}
                                onChange={e => onAddressChange(i, e)}
                            />
                        </div>
                        <div>
                            <label className='AddressInputList-sub-input-label' style={{color:primaryColor}}>
                                {t("input-labels.landmark")}
                            </label><br />
                            <input
                                className='AddressInputList-landmark-input'
                                name='landmark'
                                value={landmark}
                                onChange={e => onAddressChange(i, e)}
                            />
                        </div>
                        <div className='AddressInputList-inline-inputs'>
                            <div className='AddressInputList-inline-inputs1'>
                                <label className='AddressInputList-sub-input-label' style={{color:primaryColor}}>
                                    {t("input-labels.zip")}
                                </label><br />
                                <input
                                    className='AddressInputList-cep_or_pincode-input'
                                    name='cep_or_pincode'
                                    value={cep_or_pincode}
                                    onChange={e => onAddressChange(i, e)}
                                />
                            </div>
                            <div className='AddressInputList-inline-inputs2'>
                                <label className='AddressInputList-sub-input-label' style={{color:primaryColor}}>
                                    {t("input-labels.city")}
                                </label><br />
                                <input
                                    className='AddressInputList-city-input'
                                    name='city'
                                    value={city}
                                    onChange={e => onAddressChange(i, e)}
                                />
                            </div>
                        </div>
                        <div className='AddressInputList-inline-inputs'>
                            <div className='AddressInputList-inline-inputs1'>
                                <label className='AddressInputList-sub-input-label' style={{color:primaryColor}}>
                                    {t("input-labels.state")}
                                </label><br />
                                <input
                                    className='AddressInputList-state-input'
                                    name='state'
                                    value={state}
                                    onChange={e => onAddressChange(i, e)}
                                />
                            </div>
                            {/* <div className='AddressInputList-inline-inputs2'>
                                <label className='AddressInputList-sub-input-label' style={{color:primaryColor}}>
                                    {t("input-labels.country")}
                                </label><br />
                                <input
                                    className='AddressInputList-country-input'
                                    name='country'
                                    value={country}
                                    onChange={e => onAddressChange(i, e)}
                                />
                            </div> */}
                            <div className='AddressInputList-inline-inputs2'>
                                <label className='AddressInputList-sub-input-label' style={{color:primaryColor}}>
                                    {t("input-labels.country")}
                                </label><br />
                                <select
                                    disabled={true}
                                    className='AddressInputList-country-options-input'
                                    name='country'
                                    value={country}
                                    onChange={e => onAddressChange(i, e)}
                                >
                                    <option value="">{t("select-text")}</option>
                                    <option value="Brazil">{t("countries.Brazil")}</option>
                                    <option value="India">{t("countries.India")}</option>
                                    <option value="United States">{t("countries.United-States")}</option>
                                </select>
                            </div>
                        </div>
                    </div>)}
                <div>
                    <p className='AddressInputList-address-add-btn' onClick={addAddressBox}>{t("button.add")}</p>
                </div>
            </div>
        </div>
    )
}

export default AddressInputList