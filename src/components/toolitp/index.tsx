import React, {FC} from 'react';
import styles from './styles.module.css';

type Props = {
	isVisible: boolean
}

export const Tooltip:FC<Props> = ({ isVisible }) => {
	if (isVisible){
		return (
			<p className={styles.tooltip}>text copied to clipboard!</p>
		)
	}
return null;
}
