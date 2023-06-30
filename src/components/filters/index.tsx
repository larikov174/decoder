import React, {FC} from 'react';
import styles from './styles.module.css';

type Props = {
	filterValue: number,
	handleFilter: (e:React.FormEvent<HTMLInputElement>) => void
}

export const Filters: FC<Props>  = ({ filterValue, handleFilter }) => {
	
	return (
		<div className={styles.container}>
			<span>
			<input type='radio' id='all' name='radio' value={0} checked={filterValue === 0} onChange={handleFilter} />
			<label htmlFor='all'>Show all</label>
			</span>
			<span>
			<input type='radio' id='availability' name='radio' value={8} checked={filterValue === 8} onChange={handleFilter} />
			<label htmlFor='availability'>Availability</label>
			</span>
			<span>
			<input type='radio' id='baseParams' name='radio' value={7} checked={filterValue === 7} onChange={handleFilter} />
			<label htmlFor='baseParams'>BaseParams</label>
			</span>
			<span>
			<input type='radio' id='intervals' name='radio' value={9} checked={filterValue === 9} onChange={handleFilter} />
			<label htmlFor='intervals'>Intervals</label>
			</span>
			<span>
			<input type='radio' id='pms' name='radio' value={10} checked={filterValue === 10} onChange={handleFilter} />
			<label htmlFor='pms'>PMS</label>
			</span>
		</div>
	)
}
