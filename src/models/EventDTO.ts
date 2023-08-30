export default class EventDTO {
    name: string;
    description: string;
    subdomain: string;
    gameplay: string;
    scoreOption: string;
    startDate: Date;
    endDate: Date;
    maxPlayers: number | undefined;
    ranking: string;
    secret: string;
    exercices: string[];

    constructor(
    )
    {
        this.name = '';
        this.description = '';
        this.subdomain = '';
        this.gameplay = '';
        this.scoreOption = '';
        this.startDate = new Date();
        this.endDate = new Date();
        this.maxPlayers = 2;
        this.ranking = 'Public';
        this.secret = '';
        this.exercices = [''];
    }
}

import { object, string, number, date } from 'yup';

const Step1ValidationSchema = object().shape({  
    name:string().required('Name Required').typeError('Name Required'),
    description: string().required('Description Required').typeError('Description Required'),
    subdomain: string().required('Subdomain Required').typeError('Subdomain Required')
})

const Step2ValidationSchema = object().shape({  
    gameplay:string().required('Gameplay Required').typeError('Gameplay Required'),
    scoreOption: string().required('Score Option Required').typeError('Description Required'),
    startDate: date().required('Start Date Required').typeError('Start Date Required'),
    endDate: date()
        .required('End date is required')
        .when('startDate', (startDate, schema) => {
        if (startDate) {
            return schema.min(startDate, 'End date must be after the start date');
        }
        return schema;
    }),
    maxPlayers:number().required('Max Player Number Required').typeError('Max Player Number Required'),
    ranking: string().required('Ranking Required').typeError('Description Required'),
    secret: string().typeError('Secret Error')
})

const Step3ValidationSchema = object().shape({
//it s done inside the custome components
})

export { EventDTO, Step1ValidationSchema, Step2ValidationSchema}