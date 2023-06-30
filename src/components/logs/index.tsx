import React, {FC, useState, useCallback} from 'react';
import {decodeData, DecodedDataTypes, isValidInput} from '../../utils';
import {Filters} from '../filters';
import {Table} from '../table';

import styles from './styles.module.css';

export const Logs: FC = () => {
	const [value, setValue] = useState<string>('');
	const [data, setData] = useState<DecodedDataTypes | undefined>(undefined);
	
	const handleChange = useCallback((e:React.FormEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}, []);
	
	const handleClick = useCallback(()=>{
		setData(decodeData(value));
	},[value])
	
	const handleSelect = useCallback((e:React.FormEvent<HTMLInputElement>)=>{
		return e.currentTarget.select();
	},[])
	
	const handleCheckInput = isValidInput(value);
	
	const handleFilter = useCallback((e:React.FormEvent<HTMLInputElement>) => {
		const selectedValue = Number(e.currentTarget.value);
		const isChecked = e.currentTarget.checked;
		
		if (isChecked && selectedValue !== 0) {
			setData(decodeData(value)?.filter(item=> item.eventId === selectedValue))
			return;
		}
		
		setData(decodeData(value))
	}, [data, value]);
	
	
	return (
		<div className={styles.container}>
			<h2>Log decoder</h2>
			<input className={styles.input} value={value} placeholder='input your data here...' onChange={handleChange} onClick={handleSelect} />
			<button className={styles.button} onClick={handleClick} disabled={handleCheckInput}>decode</button>
			{data && (
				<>
					<Filters handleFilter={handleFilter} />
					<Table tableData={data}/>
				</>
				)}
		</div>
	)
}
