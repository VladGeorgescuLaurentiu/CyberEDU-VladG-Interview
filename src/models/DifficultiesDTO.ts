export default class DifficultiesDTO {
    challenges_count: number;
    name: string;
    selected: boolean;
    rank: number;
    lab: null | any;

    constructor() {
        this.challenges_count = 0;
        this.name = '';
        this.selected = false;
        this.rank = 0;
        this.lab = null;
    }
}