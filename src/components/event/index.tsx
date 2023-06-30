// @ts-nocheck
import {parse, JavaScriptValue} from 'lossless-json';
import React, {FC} from 'react';
import {formatDate} from '../../utils';
import styles from './styles.module.css';

type Props = {
	eventId: number,
	data: string
}

type ParsedObject = {
	available: boolean,
	range: {
		startDate: string,
		endDate: string,
		start: string,
		end: string
	},
	baseParams: {
		durationDiscounts: {percent: number, threshold: number}[],
		extraGuestFee: number,
		extraGuestThreshold: number,
		instant: {active: boolean, maxDays?: number, minDays?: number},
		minimalDuration: number,
		nightPrice: number,
		refund: {
			days: number
		},
		variablePrepayment: {
			percent: number,
			threshold: number
		}[],
		virtualPhoneOption: boolean,
	},
	source?: string,
		bookingID: number
	intervals: {
		range: {
			endDate: string,
			startDate: string,
		},
		perDate: {
			nightPrice: number,
			extraGuestFee: number,
			minimalDuration: number,
			variablePrepayment: {
				percent: number,
				threshold: number
			}[]
		},
		start: string,
		end: string,
	}[],
	url: string,
}

const Details:FC<Props> = ({ eventId, data }) => {
	const eventData: ParsedObject = JSON.parse(data);
		const bookingData: JavaScriptValue = parse(data);
	
	if (eventId === 3) {
		
		return ( <span>
				<b>Add booking:</b>
				<ul>
					<li>
					<b>range:</b>{' '}<span>{formatDate(bookingData.range.start)} - {formatDate(bookingData.range.end)}</span>
					</li>
					<li>
					<b>bookingID:</b>{' '}<span>{bookingData.bookingID.value}</span>
					</li>
				</ul>
			</span>
		)
	}
	
	if (eventId === 4) {
		return <p>Export Avito calendar</p>;
	}
	
	if (eventId === 5) {
		return (
			<span>
				<b>Import external calendar:</b>
				<ul>
					<li>
						<i>{eventData.url}</i>
					</li>
				</ul>
			</span>
		);
	}
	
	if (eventId === 6) {
		return (
			<span>
				<b>Delete external calendar:</b>
				<ul>
					<li>
						<i>{eventData.source}</i>
					</li>
				</ul>
			</span>
		);
	}

	if (eventId === 7) {
		return (
				<li><b>baseParams:</b>
					<ul>
						{eventData.baseParams?.nightPrice ? <li><b>nightPrice: </b><span>{eventData.baseParams?.nightPrice}</span></li> : null}
						{eventData.baseParams?.extraGuestFee ? <li><b>extraGuestFee: </b><span>{eventData.baseParams?.extraGuestFee}</span></li> : null}
						{eventData.baseParams?.extraGuestThreshold ? <li><b>extraGuestThreshold: </b><span>{eventData.baseParams?.extraGuestThreshold}</span></li> : null}
						{eventData.baseParams?.minimalDuration ? <li><b>minimalDuration: </b><span>{eventData.baseParams?.minimalDuration}</span></li> : null}
						{eventData.baseParams?.refund?.days ? <li><b>refundDays: </b><span>{eventData.baseParams.refund?.days}</span></li> : null}
 						<li>
							<b>virtualPhoneOption:</b>{' '}
							<span style={{color: `${eventData.baseParams.virtualPhoneOption ? 'blue' : 'red'}`}}>
								{`${eventData.baseParams.virtualPhoneOption}`}
							</span>
						</li>
						<li><b>instant:</b>
						<ul>
							<li>
								<b>active:</b>{' '}
								<span style={{color: `${eventData.baseParams.instant.active ? 'blue' : 'red'}`}}>
									{`${eventData.baseParams.instant.active}`}
								</span>
							</li>
							{eventData.baseParams.instant.maxDays &&<li>{`maxDays: ${eventData.baseParams.instant.maxDays}`}</li>}
							{eventData.baseParams.instant.minDays &&<li>{`minDays: ${eventData.baseParams.instant.minDays}`}</li>}
						</ul>
					</li>
						<li><b>durationDiscounts:</b>
							<ul>
								{eventData.baseParams.durationDiscounts.map(item => (
									<li key={item.threshold}>{`percent: ${item.percent}, threshold: ${item.threshold}`}</li>
								))}
							</ul>
						</li>
						{eventData.baseParams.variablePrepayment && eventData.baseParams.variablePrepayment.length ? (
						<li><b>variablePrepayment:</b>
							<ul>
								{eventData.baseParams.variablePrepayment?.map(item => (
									<li key={item.threshold}>{`percent: ${item.percent}, threshold: ${item.threshold}`}</li>
								))}
							</ul>
						</li>
						) : null}
					</ul>
				</li>
		)
	}
	
	if (eventId === 8) {
		return (
			<>
				<li>
					<b>range:</b>{' '}
					<span>{formatDate(eventData.range.startDate)} - {formatDate(eventData.range.endDate)}</span>
				</li>
				<li style={{marginTop: '5px'}}>
					<b>available:</b>{' '}
					<span style={{color: `${eventData.available ? 'blue' : 'red'}`}}>
						{`${eventData.available}`}
					</span>
				</li>
			</>
		);
	}
	
	if (eventId === 9) {
		return (
				<li>
					<b>{eventData.source ? 'PMS (interval settings):' : 'intervals:'}</b>
					<ul>
						{eventData.intervals.map((item, i) => (
							<div key={i}>
							<li>
								<b>range:</b>{' '}
								<span>{formatDate(item.range.startDate)} - {formatDate(item.range.endDate)}</span>
							</li>
							<li>
								<b>settings:</b>{' '}
								<ul>
									<li><b>nightPrice: </b><span>{item.perDate?.nightPrice || null}</span></li>
									<li><b>extraGuestFee: </b><span>{item.perDate?.extraGuestFee || null}</span></li>
									<li><b>minimalDuration: </b><span>{item.perDate?.minimalDuration || null}</span></li>
									{item.perDate.variablePrepayment ? (
										<li><b>variablePrepayment:</b>
										<ul>
											{item.perDate.variablePrepayment.map(item => (
												<li key={item.threshold}>{`percent: ${item.percent}, threshold: ${item.threshold}`}</li>
											))}
										</ul>
									</li>
										):null}
								</ul>
							</li>
							</div>
						))}
					</ul>
				</li>
		);
	}
	
	if (eventId === 10) {
		return (
					<li><b>PMS (close intervals):</b>
						<ul>
							{eventData.intervals.map((item, i) => (
								<li key={i}>
									<b>range:</b>{' '}
									<span>{formatDate(item.start)} - {formatDate(item.end)}</span>
								</li>
							))}
						</ul>
					</li>
		)
	}
	
	return <li>{JSON.stringify(eventData)}</li>
}

export const Event:FC<Props> = ({ data, eventId }) => {
	
	return (
		<td className={styles['cell-with-details']}>
			<ul>
				<Details eventId={eventId} data={data} />
			</ul>
		</td>

	)
}
