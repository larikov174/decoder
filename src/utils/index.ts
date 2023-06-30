import formatISO from 'date-fns/formatISO';

type EventDataTypes = {
	"eventTypeID": number,
	"itemID": number,
	"userID": number,
	"createdAt": string,
	"data": string
};

type EncodedString = {
	result: {
		events: EventDataTypes[]
	}
}

export type DecodedDataTypes = {
	eventId: number,
	time: string,
	data: string
}[];

export const decodeData = (data:string): DecodedDataTypes | undefined=>{
	try{
		const parsedData: EncodedString = JSON.parse(data);
		
		return parsedData.result.events.map((item: EventDataTypes) => {
			return {eventId: item.eventTypeID, time: item.createdAt, data: atob(item.data)}
		});
	}catch(err){
		alert('check your input data!')
		return undefined;
	}
};

export const isValidInput = (input: string):boolean => {
		return Boolean(!input.includes('events'))
}

export const formatDate = (date: string):string => {
	return formatISO(new Date(date),  {representation: 'date'});
}
