//import styles from './App.module.scss'

import {useRef, useState} from "react";

import {Parser} from '@dldc/literal-parser';

//https://www.npmjs.com/package/crypto-js
import CryptoJS from 'crypto-js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import base32 from "base32";

const hexToString = (hex: string) => {
	let str = '';
	for (let i = 0; i < hex.length; i += 2) {
		const hexValue = hex.substr(i, 2);
		const decimalValue = parseInt(hexValue, 16);
		str += String.fromCharCode(decimalValue);
	}
	return str;
};

const stringToHex = (str: string) => {
	let hex = '';
	for (let i = 0; i < str.length; i++) {
		const charCode = str.charCodeAt(i);
		const hexValue = charCode.toString(16);
		// Pad with zeros to ensure two-digit representation
		hex += hexValue.padStart(2, '0');
	}
	return hex;
};

function App() {
	const [output, setOutput] = useState('');
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const [options] = useState<string[]>([
		"jsonCleaner",
		"base16-encode",
		"base16-decode",
		"base32-encode",
		"base32-decode",
		"base64-encode",
		"base64-decode",
		"encodeURI",
		"decodeURI",
		"encodeURIComponent",
		"decodeURIComponent",
		"jsonToQueryString",
		"queryStringToJson",
		"MD5",
		"SHA-1",
		"SHA-3",
		"SHA-224",
		"SHA-256",
		"SHA-384",
		"SHA-512",
	]);
	const [selectedOption, setSelectedOption] = useState<string>(options[0]);

	const selectAllText = (e: { target: { select: () => void; }; }) => {
		e.target.select();
	};

	function handleConvert() {
		let value = '';
		try {
			value = inputRef.current!.value;
			console.log("value", value);
			if (selectedOption === "base64-encode") {
				value = btoa(value);
			} else if (selectedOption === "base64-decode") {
				value = atob(value);
			} else if (selectedOption === "base16-encode") {
				value = stringToHex(value);
			} else if (selectedOption === "base16-decode") {
				value = hexToString(value);
			} else if (selectedOption === "base32-encode") {
				value = base32.encode(value);
			} else if (selectedOption === "base32-decode") {
				value = base32.decode(value);
			} else if (selectedOption === "encodeURI") {
				value = encodeURI(value);
			} else if (selectedOption === "decodeURI") {
				value = decodeURI(value);
			} else if (selectedOption === "jsonToQueryString") {
				const jso = Parser.parse(value);
				console.log("jso", jso);
				value = new URLSearchParams(jso).toString();
			} else if (selectedOption === "queryStringToJson") {
				if (value.includes("?")) {
					value = value.substring(value.indexOf("?") + 1);
				}
				const urlSearchParams = new URLSearchParams(value);
				console.log('urlSearchParams', urlSearchParams);
				const jso = Object.fromEntries(urlSearchParams.entries());
				console.log('jso', jso);
				value = JSON.stringify(jso, null, 5);
			} else if (selectedOption === "jsonCleaner") {
				const jso = Parser.parse(value);
				console.log('jso', jso);
				value = JSON.stringify(jso, null, 5);
			} else if (selectedOption === "encodeURIComponent") {
				value = encodeURIComponent(value);
			} else if (selectedOption === "decodeURIComponent") {
				value = decodeURIComponent(value);
			} else if (selectedOption === "MD5") {
				value = CryptoJS.MD5(value).toString();
			} else if (selectedOption === "SHA-1") {
				value = CryptoJS.SHA1(value).toString();
			} else if (selectedOption === "SHA-3") {
				value = CryptoJS.SHA3(value).toString();
			} else if (selectedOption === "SHA-224") {
				value = CryptoJS.SHA224(value).toString();
			} else if (selectedOption === "SHA-256") {
				value = CryptoJS.SHA256(value).toString();
			} else if (selectedOption === "SHA-384") {
				value = CryptoJS.SHA384(value).toString();
			} else if (selectedOption === "SHA-512") {
				value = CryptoJS.SHA512(value).toString();
			}
			console.log("value", value);
		} catch (e) {
			if (e instanceof Error) {
				value = 'Error: ' + e.message;
			} else {
				value = 'Error: ' + e;
			}
		}
		setOutput(value);
	}

	return (
		<div className="min-h-screen w-screen bg-gray-900 text-gray-100 p-6 flex flex-col gap-4">
			<textarea
				onFocus={selectAllText}
				id="input"
				ref={inputRef}
				className="
		          flex-1 w-full resize-none rounded-md p-4
		          bg-gray-800 text-gray-100 placeholder-gray-400
		          border border-gray-700
		          focus:outline-none focus:ring-2 focus:ring-blue-500
		        "
				placeholder="Enter your input..."
			/>
			<div className="flex justify-end items-center gap-4">
				<select
					id="type"
					value={selectedOption}
					onChange={(e) => setSelectedOption(e.target.value)}
					className="
			            bg-gray-800 text-gray-100 border border-gray-700
			            rounded-md px-6 py-3
			            focus:outline-none focus:ring-2 focus:ring-blue-500
			          "
				>
					{options.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
				<button
					id="submit"
					onClick={() => handleConvert()}
					className="
			            px-6 py-3 rounded-md
			            bg-blue-600 text-white font-semibold
			            hover:bg-blue-500
			            focus:outline-none focus:ring-2 focus:ring-blue-400
			          "
				>
					Submit
				</button>
			</div>
			<textarea
				onFocus={selectAllText}
				id="output"
				readOnly
				className="
		          flex-1 w-full resize-none rounded-md p-4
		          bg-gray-800 text-gray-100 placeholder-gray-400
		          border border-gray-700
		          focus:outline-none
		        "
				placeholder="Output will appear here..."
				value={output}
			/>
		</div>
	);
}

export default App
