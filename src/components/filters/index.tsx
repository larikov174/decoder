import React, {FC, useCallback, useState} from 'react';
import styles from './styles.module.css';

type Props = {
	handleFilter: (e:React.FormEvent<HTMLInputElement>) => void
}

export const Filters: FC<Props>  = ({ handleFilter }) => {
	const [value, setValue] = useState(0);
	const handleClick = useCallback((e:React.FormEvent<HTMLInputElement>) => {
		setValue(Number(e.currentTarget.value))
	}, []);
	
	return (
		<div className={styles.container}>
			<span>
			<input type='radio' id='all' name='radio' value={0} checked={value === 0} onChange={handleFilter} onClick={handleClick} />
			<label htmlFor='all'>Show all</label>
			</span>
			<span>
			<input type='radio' id='availability' name='radio' value={8} checked={value === 8} onChange={handleFilter} onClick={handleClick} />
			<label htmlFor='availability'>Availability</label>
			</span>
			<span>
			<input type='radio' id='baseParams' name='radio' value={7} checked={value === 7} onChange={handleFilter} onClick={handleClick} />
			<label htmlFor='baseParams'>BaseParams</label>
			</span>
			<span>
			<input type='radio' id='intervals' name='radio' value={9} checked={value === 9} onChange={handleFilter} onClick={handleClick} />
			<label htmlFor='intervals'>Intervals</label>
			</span>
		</div>
	)
}
