import React, {FC} from 'react';
import {formatDate} from '../../utils';

type Props = {
	eventId: number,
	data: string
}

type ParsedObject = {
	available: boolean,
	range: {
		startDate: string,
		endDate: string
	},
	baseParams: {
		durationDiscounts: {percent: number, threshold: number}[],
extraGuestFee: number,
extraGuestThreshold: number,
instant: {active: boolean, maxDays: number},
minimalDuration: number,
nightPrice: number,
		refund: {
			days: number
		}
	},
	intervals: {
		range: {
			endDate: string,
			startDate: string,
		},
		perDate: {
			nightPrice: number,
			extraGuestFee: number,
			minimalDuration: number
		}
	}[],
	url: string,
}

type DetailsPropTypes = Pick<Props, 'eventId'> & {
	eventData: ParsedObject
}

const Details:FC<DetailsPropTypes> = ({ eventId, eventData }) => {
	if (eventId === 5) {
		return (
				<li>
					<b>url:</b>{' '}
					<span>{eventData.url}</span>
				</li>
		);
	}

	if (eventId === 7) {
		return (
				<li><b>baseParams:</b>
					<ul>
						<li><b>nightPrice: </b><span>{eventData.baseParams.nightPrice}</span></li>
						<li><b>extraGuestFee: </b><span>{eventData.baseParams.extraGuestFee}</span></li>
						<li><b>extraGuestThreshold: </b><span>{eventData.baseParams.extraGuestThreshold}</span></li>
						<li><b>minimalDuration: </b><span>{eventData.baseParams.minimalDuration}</span></li>
						<li><b>refundDays: </b><span>{eventData.baseParams.refund.days}</span></li>
						<li><b>instant:</b>
						<ul>
							<li>{`active: ${eventData.baseParams.instant.active}`}</li>
							<li>{`maxDays: ${eventData.baseParams.instant.maxDays}`}</li>
						</ul>
					</li>
						<li><b>durationDiscounts:</b>
							<ul>
								{eventData.baseParams.durationDiscounts.map(item => (
									<li key={item.threshold}>{`percent: ${item.percent}, threshold: ${item.threshold}`}</li>
								))}
							</ul>
						</li>
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
					<b>intervals:</b>
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
									<li><b>nightPrice: </b><span>{item.perDate.nightPrice}</span></li>
									<li><b>extraGuestFee: </b><span>{item.perDate.extraGuestFee}</span></li>
									<li><b>minimalDuration: </b><span>{item.perDate.minimalDuration}</span></li>
								</ul>
							</li>
							</div>
						))}
					</ul>
				</li>
		);
	}
	
	return <li>{JSON.stringify(eventData)}</li>
}

export const Event:FC<Props> = ({ data, eventId }) => {
	const parsedObject: ParsedObject = JSON.parse(data);
	
	return (
		<td>
			<ul>
				<Details eventId={eventId} eventData={parsedObject} />
			</ul>
		</td>

	)
}
