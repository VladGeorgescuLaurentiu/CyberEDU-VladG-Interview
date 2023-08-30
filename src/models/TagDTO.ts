export default class TagDTO {
    id: number;
    name: string;
    selected: boolean;
    type: string;
    challenges_count: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.selected = false;
        this.type = '';
        this.challenges_count = 0;
    }
}