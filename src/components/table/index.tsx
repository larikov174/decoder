import React, {FC, useState, useEffect} from 'react';
import {DecodedDataTypes} from '../../utils';
import {Event} from '../event';
import {Tooltip} from '../toolitp';

import styles from './styles.module.css';

type Props = {
	tableData: DecodedDataTypes
}

type CellWithDateProps = {
	time: string,
	setIsVisible: (arg: boolean) => void,
}

const CellWithDate:FC<CellWithDateProps> = ({ time, setIsVisible}) => {
	const handleCopyText = () => {
		navigator.clipboard.writeText(time).then(() => setIsVisible(true))
	}
	
	return (
		<td className={styles['cell-with-date']} onClick={handleCopyText}>{time}</td>
	)
}

export const Table: FC<Props> = ({ tableData }) => {
	const [isVisible, setIsVisible] = useState(false);
	
	useEffect(() => {
		const changeValue = () => setTimeout(() => setIsVisible(false), 1000);
		
		if (isVisible) {
			changeValue();
		}
		
		return () => clearTimeout(changeValue())
	}, [isVisible]);
	
	return (
		<>
			<table className={styles.table}>
					<thead>
						<tr>
							<th className={styles['index-column']}>Index</th>
							<th className={styles['date-column']}>Date</th>
							<th>Events</th>
						</tr>
					</thead>
				<tbody>
				{tableData.map(({time, data, eventId}, i)=>(
					<tr key={`${time}${i}`}>
						<td>{i+1}</td>
						<CellWithDate time={time} setIsVisible={setIsVisible} />
						<Event eventId={eventId} data={data} />
					</tr>
				))}
				</tbody>
			</table>
			<Tooltip isVisible={isVisible} />
	</>
	)
}
