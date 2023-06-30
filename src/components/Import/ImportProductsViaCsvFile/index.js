import React, { useState } from 'react';
import './style.css';
import Papa from "papaparse";
import ImportColumnSelector from '../ImportColumnSelector';
import NormalButton1 from '../../commons/NormalButton1';
import ImportColumnHeaders from '../ImportColumnHeaders';
import { addProductsByCsvDataApi, submitFeedbackApi } from '../../../apis/common';
import { removeSpecialCharacters } from '../../../actions/commons';
import { toast } from 'react-hot-toast';
import FeedBackContainer from '../../FeedBackContainer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const allowedExtensions = ["csv"];
let initfailedData = []
let initSuccessCount = 0;
let initFailedCount = 0;

function ImportProductsViaCsvFile() {

	let history = useNavigate();
	const [t, ] = useTranslation('importProductsViaCsvFile');
	const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

	const [error, setError] = useState("");
	const [file, setFile] = useState("");
	const [step, setStep] = useState(1);
	const [fileHeaders, setFileHeaders] = useState([]);
	const [fileData, setFileData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isUploadingStarted, setIsUploadingStarted] = useState(false);
	const [feedback, setFeeback] = useState('');
	const [isFeedbackPendingToSubmit, setIsFeedbackPendingToSubmit] = useState(false);

	// Field Names....
	const [idFieldName, setIdFieldName] = useState('');
	const [nameFieldName, setNameFieldName] = useState('');
	const [descriptionFieldName, setDescriptionFieldName] = useState('');
	const [priceInCentFieldName, setPriceInCentFieldName] = useState('');
	const [promotionalPriceInCentFieldName, setPromotionalPriceInCentFieldName] = useState('');
	const [sizeFieldName, setSizeFieldName] = useState('');
	const [brandFieldName, setBrandFieldName] = useState('');
	// const [categoryFieldName, setCategoryFieldName] = useState('');
	const [subCategoryFieldName, setSubCategoryFieldName] = useState('');
	const [statusFieldName, setStatusFieldName] = useState('');
	const [rankInStoreFieldName, setRankInStoreFieldName] = useState('');
	const [quantityFieldName, setQuantityFieldName] = useState('');

	// Counts
	const [dataWithProblem, setDataWithProblem] = useState([]);
	const [successCount, setSuccessCount] = useState(0);
	const [failureCount, setFailureCount] = useState(0);
	const [totalRowsInFile, setTotalRowsInFile] = useState(0);
	const [totalRowsProcessedInFile, setTotalRowsProcessedInFile] = useState(0);

	const handleFileChange = (e) => {
		setError("");

		// Check if user has entered the file
		if (e.target.files.length) {
			const inputFile = e.target.files[0];

			// Check the file extensions, if it not
			// included in the allowed extensions
			// we show the error
			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError(t("messages.fileExtention"));
				return;
			}

			// If input type is correct set the state
			setFile(inputFile);
		}
	};

	const handleParse = () => {
		// If user clicks the parse button without
		// a file we show a error
		if (!file) return setError(t("messages.invalidFile"));

		// Initialize a reader which allows user
		// to read any file or blob.
		const reader = new FileReader();

		// Event listener on reader when the file
		// loads, we parse it and set the data.
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;
			if (parsedData.length < 2) setError(t("messages.rowLimit"));
			else {
				const columns = Object.keys(parsedData[0]);
				if (columns.length < 4) setError(t("messages.columnLimit"));
				else {
					setTotalRowsInFile(parsedData.length);
					setFileData(parsedData);
					setFileHeaders(columns);
					setStep(2);
				}
			}
		};
		reader.readAsText(file);
	};

	const callingUploadFunc = async (batches) => {
		await addProductsByCsvDataApi(batches.shift()).then(res => {
			if (res.data.status === "success") {

				initfailedData = [...initfailedData, ...res.data.dataWithProblem];
				initSuccessCount += res.data.successCount;
				initFailedCount += res.data.failureCount;

				if (batches.length === 0) {
					setDataWithProblem(initfailedData);
					setSuccessCount(initSuccessCount);
					setFailureCount(initFailedCount);
					setTotalRowsProcessedInFile(initSuccessCount+initFailedCount);
					setStep(3);
				}
			} else {
				setError(res.data.message);
			}
		}).catch(err => toast.error(err.message));

		if (batches.length !== 0) {
			await callingUploadFunc(batches);
		}
	}

	const uploadData = async () => {

		if (!idFieldName || !nameFieldName || !priceInCentFieldName || !sizeFieldName || !subCategoryFieldName) {
			toast.error(t("messages.requiredField"));
			return;
		}

		let dataToUpload = [];

		fileData.forEach(tempRec => {
			dataToUpload.push({
				'sp_id': tempRec[idFieldName],
				'name': removeSpecialCharacters(tempRec[nameFieldName]),
				'priceInCent': tempRec[priceInCentFieldName],
				'size': tempRec[sizeFieldName],
				'subCategory': (!!subCategoryFieldName && subCategoryFieldName !== "empty") ? tempRec[subCategoryFieldName] : "",
				'description': (!!descriptionFieldName && descriptionFieldName !== "empty") ? tempRec[descriptionFieldName] : "",
				'promotionalPriceInCent': (!!promotionalPriceInCentFieldName && promotionalPriceInCentFieldName !== "empty") ? tempRec[promotionalPriceInCentFieldName] : tempRec[priceInCentFieldName],
				'brand': (!!brandFieldName && brandFieldName !== "empty") ? tempRec[brandFieldName] : "",
				'status': (!!statusFieldName && statusFieldName !== "empty") ? tempRec[statusFieldName] : "",
				'rankInStore': (!!rankInStoreFieldName && rankInStoreFieldName !== "empty") ? tempRec[rankInStoreFieldName] : "",
				'quantity': (!!quantityFieldName && quantityFieldName !== "empty") ? tempRec[quantityFieldName] : "",
			})
		})

		setIsUploadingStarted(true);
		setIsLoading(true);
		let batches = []
		while (dataToUpload.length !== 0) {
			let batch = [];
			while (batch.length < 200 && dataToUpload.length !== 0) {
				batch.push(dataToUpload.shift());
			}
			batches.push(batch)
		}
		await callingUploadFunc(batches);
		if(isFeedbackPendingToSubmit) submitTheFeedback(feedback);
		setIsLoading(false);
	}

	const changeLevel = () => {
		if (step === 1) {
			handleParse();
		} else if (step === 2) {
			uploadData();
		} else if (step === 3){
    		history("/my-store/menu/manage-products");
		}
	}

	const submitTheFeedback = async (feed) => {
		await submitFeedbackApi({
			'language': language,
			'feedback': feed,
		}).then(res=>{
			if(res.data.status==='success'){
				if(language==='pt') toast.error(res.data.message.pt);
				else toast.error(res.data.message.en);
			}
		}).catch(err=>toast.error(err.message));
		setIsFeedbackPendingToSubmit(false);
	}

	const OnFeedbackSubmit = (feed) => {
		if(!feed){
			toast.error(t("messages.emptyFeedBack"));
			return;
		}
		if(!isLoading){
			submitTheFeedback(feed);
		}else{
			setFeeback(feed);
			setIsFeedbackPendingToSubmit(true);
		}
	}

	const setStepBack = () => {
		initfailedData = []
		initSuccessCount = 0;
		initFailedCount = 0;
		if(step===3){
			setStep(2);
		}else if(step===2){
			setStep(1);
		}
	}

	return (
		<div className='ImportProductsViaCsvFile'>
			{isUploadingStarted && <div className='ImportProductsViaCsvFile-loader'>
				<div className='ImportProductsViaCsvFile-loader-inner'>

					{isLoading ? <div className='ImportProductsViaCsvFile-loader-inner-status'>
						<h5 className='text-primary'>{t("feedbackCard.statusProcessingLabel")}
							<div className='ImportProductsViaCsvFile-loader-inner-status-oscilator'>.</div>
							<div className='ImportProductsViaCsvFile-loader-inner-status-oscilator'>.</div>
							<div className='ImportProductsViaCsvFile-loader-inner-status-oscilator'>.</div>
							<div className='ImportProductsViaCsvFile-loader-inner-status-oscilator'>.</div>
							<div className='ImportProductsViaCsvFile-loader-inner-status-oscilator'>.</div>
							<div className='ImportProductsViaCsvFile-loader-inner-status-oscilator'>.</div>
						</h5>
						<p>{t("feedbackCard.statusProcessingPara")}</p>
					</div>:<div className='ImportProductsViaCsvFile-loader-inner-status'>
						<p className='ImportProductsViaCsvFile-loader-inner-close-btn' onClick={()=>setIsUploadingStarted(false)}>X</p>
						<h5 className='text-success'>{t("feedbackCard.statusProcessedLabel")}</h5>
						<p>{t("feedbackCard.statusProcessedPara")} </p>
					</div>}
					<FeedBackContainer submitText={t("feedSubmitText")} onSubmit={OnFeedbackSubmit} />
				</div>
			</div>}
			<div className="ImportDataProdutos-container">
				{step!==1 && 
					<h4 className='ImportDataProdutos-back-button' onClick={setStepBack}>
						<img src='/assets/svgs/arrow.svg' alt='back' />{t("backButtonText")}
					</h4>
				}
				{step === 1 && <>
					<div className='ImportDataProdutos-information'>
						<h3>{t("step1.head")}</h3>
						<p>{t("step1.p1-line1")}</p>
						<ul className='ImportDataProdutos-information-list'>
							<li><b>{t("step1.bullerPoints.line1.bold")}</b> {t("step1.bullerPoints.line1.p")}</li>
							<li><b>{t("step1.bullerPoints.line2.bold")}</b> {t("step1.bullerPoints.line2.p")}</li>
							<li><b>{t("step1.bullerPoints.line3.bold")}</b> {t("step1.bullerPoints.line3.p")}</li>
							<li><b>{t("step1.bullerPoints.line4.bold")}</b> {t("step1.bullerPoints.line4.p")}</li>
							<li><b>{t("step1.bullerPoints.line5.bold")}</b> {t("step1.bullerPoints.line5.p")}</li>
							<li><b>{t("step1.bullerPoints.line6.bold")}</b> {t("step1.bullerPoints.line6.p")}</li>
							<li><b>{t("step1.bullerPoints.line7.bold")}</b> {t("step1.bullerPoints.line7.p")}</li>
							<li><b>{t("step1.bullerPoints.line8.bold")}</b> {t("step1.bullerPoints.line8.p")}</li>
							<li><b>{t("step1.bullerPoints.line9.bold")}</b> {t("step1.bullerPoints.line9.p")}</li>
						</ul>
						<p>{t("step1.p2-line1")}</p>
					</div>
					<div className="ImportDataProdutos-step2-button-div">
						<label htmlFor="ImportDataProdutos-csvInput" id="ImportDataProdutos-csvInputLabel">
							<img src='/assets/icons/pngs/import-csv.png' alt='UPLOAD CSV' /> <b>{t("step1.uploadButton")}</b>
						</label>
						<h5>{!!file && <>{file.name}</>}</h5>
					</div>
					<input
						onChange={handleFileChange}
						id="ImportDataProdutos-csvInput"
						name="file"
						type="File"
					/>
				</>}

				{step === 2 && <>
					<h5 className="ImportDataProdutos-local-text">{t("step2.head")}</h5>
					<div>
						<ImportColumnHeaders labelminWidth="150PX" />
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row1.label")}
							selectOptions={fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })}
							selectedValue={idFieldName}
							onChange={e => { setIdFieldName(e.target.value) }}
							exapleLabel={!!idFieldName ? fileData[0][idFieldName] : "---------"}
							tooltip={t("step2.rows.row1.tooltip")}
						/>
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row2.label")}
							selectOptions={fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })}
							selectedValue={nameFieldName}
							onChange={e => { setNameFieldName(e.target.value) }}
							exapleLabel={!!nameFieldName ? fileData[0][nameFieldName] : "---------"}
							tooltip={t("step2.rows.row2.tooltip")}
						/>
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row3.label")}
							selectOptions={fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })}
							selectedValue={priceInCentFieldName}
							onChange={e => { setPriceInCentFieldName(e.target.value) }}
							exapleLabel={!!priceInCentFieldName ? fileData[0][priceInCentFieldName] : "---------"}
							tooltip={t("step2.rows.row3.tooltip")}
						/>
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row4.label")}
							selectOptions={fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })}
							selectedValue={sizeFieldName}
							onChange={e => { setSizeFieldName(e.target.value) }}
							exapleLabel={!!sizeFieldName ? fileData[0][sizeFieldName] : "---------"}
							tooltip={t("step2.rows.row4.tooltip")}
						/>
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row5.label")}
							selectOptions={fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })}
							selectedValue={subCategoryFieldName}
							onChange={e => { setSubCategoryFieldName(e.target.value) }}
							exapleLabel={!!subCategoryFieldName ? fileData[0][subCategoryFieldName] : "---------"}
							tooltip={t("step2.rows.row5.tooltip")}
						/>

						{/* OPTIONAL FIELDS */}
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row6.label")}
							selectOptions={[{ label: t("step2.emptyOption"), value: "empty" }, ...fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })]}
							selectedValue={descriptionFieldName}
							onChange={e => { setDescriptionFieldName(e.target.value) }}
							exapleLabel={!!descriptionFieldName ? fileData[0][descriptionFieldName] : "---------"}
							tooltip={t("step2.rows.row6.tooltip")}
						/>
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row7.label")}
							selectOptions={[{ label: t("step2.emptyOption"), value: "empty" }, ...fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })]}
							selectedValue={promotionalPriceInCentFieldName}
							onChange={e => { setPromotionalPriceInCentFieldName(e.target.value) }}
							exapleLabel={!!promotionalPriceInCentFieldName ? fileData[0][promotionalPriceInCentFieldName] : "---------"}
							tooltip={t("step2.rows.row7.tooltip")}
						/>
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row8.label")}
							selectOptions={[{ label: t("step2.emptyOption"), value: "empty" }, ...fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })]}
							selectedValue={brandFieldName}
							onChange={e => { setBrandFieldName(e.target.value) }}
							exapleLabel={!!brandFieldName ? fileData[0][brandFieldName] : "---------"}
							tooltip={t("step2.rows.row8.tooltip")}
						/>

						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row9.label")}
							selectOptions={[{ label: t("step2.emptyOption"), value: "empty" }, ...fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })]}
							selectedValue={statusFieldName}
							onChange={e => { setStatusFieldName(e.target.value) }}
							exapleLabel={(!!statusFieldName && statusFieldName !== "empty") ? fileData[0][statusFieldName] : "---------"}
							tooltip={t("step2.rows.row9.tooltip")}
						/>
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row10.label")}
							selectOptions={[{ label: t("step2.emptyOption"), value: "empty" }, ...fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })]}
							selectedValue={rankInStoreFieldName}
							onChange={e => { setRankInStoreFieldName(e.target.value) }}
							exapleLabel={(!!rankInStoreFieldName && rankInStoreFieldName !== "empty") ? fileData[0][rankInStoreFieldName] : "---------"}
							tooltip={t("step2.rows.row10.tooltip")}
						/>
						<ImportColumnSelector
							labelminWidth="150PX"
							placholder={t("selectPlaceholder")}
							columnLabel={t("step2.rows.row11.label")}
							selectOptions={[{ label: t("step2.emptyOption"), value: "empty" }, ...fileHeaders.filter(col => !!col).map(col => { return { label: col, value: col } })]}
							selectedValue={quantityFieldName}
							onChange={e => { setQuantityFieldName(e.target.value) }}
							exapleLabel={(!!quantityFieldName && quantityFieldName !== "empty") ? fileData[0][quantityFieldName] : "---------"}
							tooltip={t("step2.rows.row11.tooltip")}
						/>
					</div>
				</>}

				{step === 3 && <>
					<div className="ImportDataProdutos-result-box">
						<div className="ImportDataProdutos-result-box-left">
							<div className="ImportDataProdutos-result-box-left-c1">
								<h5 className="ImportDataProdutos-result-box-left-c1-t1 text-success">{t("step3.successCountText")}</h5>
								<h5 className="ImportDataProdutos-result-box-left-c1-t2 btn-success">{successCount}</h5>
							</div>
							<div className="ImportDataProdutos-result-box-left-c1">
								<h5 className="ImportDataProdutos-result-box-left-c1-t1 text-danger">{t("step3.failedCountText")}</h5>
								<h5 className="ImportDataProdutos-result-box-left-c1-t2 btn-danger">{failureCount}</h5>
							</div>
							<div className="ImportDataProdutos-result-box-left-c1">
								<h5 className="ImportDataProdutos-result-box-left-c1-t1">{t("step3.rowsSent")}</h5>
								<h5 className="ImportDataProdutos-result-box-left-c1-t2">{totalRowsProcessedInFile}</h5>
							</div>
							<div className="ImportDataProdutos-result-box-left-c1">
								<h5 className="ImportDataProdutos-result-box-left-c1-t1">{t("step3.rowsInFile")}</h5>
								<h5 className="ImportDataProdutos-result-box-left-c1-t2">{totalRowsInFile}</h5>
							</div>
							<div className="ImportDataProdutos-result-box-left-c1">
								<NormalButton1 label={t("step3.submit")} classNames="ImportDataProdutos-footer-button" onClick={changeLevel} />
							</div>
						</div>

					</div>
					<table className="ImportDataProdutos-results-table">
						<thead className="">
							<tr>
								<td>{t("step3.tabelHead1")}</td>
								<td>{t("step3.tabelHead2")}</td>
							</tr>
						</thead>
						<tbody>
							{dataWithProblem.map((tempSpId, i) => {
								return(<tr key={i}>
										<td>{tempSpId[0]}</td>
										<td className="text-danger">{tempSpId[1][language]}</td>
									</tr>)
							})}
						</tbody>
					</table>
				</>}

				{!!error && <><h5 className="ImportDataProdutos-error">{error}</h5></>}
			</div>

			<div className="ImportDataProdutos-footer">
				{(step !== 3) && <>
					<NormalButton1 label={t("nextButtonText")} classNames="ImportDataProdutos-footer-button" onClick={changeLevel} />
				</>}
				{(step === 3) && <>
					<NormalButton1 label={t("step3.submit")} classNames="ImportDataProdutos-footer-button" onClick={changeLevel} />
				</>}
			</div>
		</div>
	)
}

export default ImportProductsViaCsvFile