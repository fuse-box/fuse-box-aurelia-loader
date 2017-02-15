import * as internalDataArray from './dummyData';


/**
 * Generate a lot of dummy data
 * 
 */
export class DummyDataGenerator {

    private totalGenerated: any;
    private index: any;
    private first: any;
    private last: any;
    private images: any;
    private integer: any;
    private date: any;
    private country: any;
    private number: any;
    private bool: any;
    private color: any;
    private internalDataArray: any;



    constructor() {
        this.totalGenerated = 0;
        this.internalDataArray = internalDataArray.data;
        this.index = [];
        this.first = [];
        this.last = [];
        this.images = [];
        this.integer = [];
        this.date = [];
        this.country = [];
        this.color = [];
        this.bool = [];


        for (let i = 0; i < this.internalDataArray.length; i++) {
            this.index.push(this.internalDataArray[i].index);
            this.first.push(this.internalDataArray[i].first);
            this.last.push(this.internalDataArray[i].last);
            this.images.push(this.internalDataArray[i].image);
            this.integer.push(this.internalDataArray[i].integer);
            this.date.push(new Date(this.internalDataArray[i].date));
            this.country.push(this.internalDataArray[i].country);
            this.color.push(this.internalDataArray[i].color);
        }


    }

    public reset(): void {
        this.totalGenerated = 0;
    }


    public generateData(no: any, callback: any): any {

        let dummyArray = [];
        for (let i = 0; i < no; i++) {
            // up count
            this.totalGenerated++;
            let random1 = Math.floor(Math.random() * 500) + 0;
            let random2 = Math.floor(Math.random() * 500) + 0;
            let random3 = Math.floor(Math.random() * 500) + 0;
            let random4 = Math.floor(Math.random() * 500) + 0;
            let random5 = Math.floor(Math.random() * 500) + 0;

            let highAttribute = 'high';
            if (random2 > 50) {
                highAttribute = 'very low';
            }
            if (random2 > 100) {
                highAttribute = 'low';
            }
            if (random2 > 250) {
                highAttribute = 'normal';
            }
            if (random2 > 400) {
                highAttribute = 'high';
            }

            let numAttribute = this.integer[random3] + "." + this.integer[random4]
            dummyArray.push({
                'index': 1 * this.totalGenerated,
                'name': this.first[random4] + ' ' + this.last[random3],
                'images': this.images[random4],
                'integer': this.integer[random2],
                'date': this.date[random3],
                'country': this.country[random1],
                'color': this.color[random4],
                'number': numAttribute * 1,
                'bool': random1 % 3 ? true : false,
                'gender': random1 % 2 === 0 ? 'male' : 'female',
                'high': highAttribute
            });
        }

        callback(dummyArray);



    }



    // tok it from a polymer sample resonse data
    // https://elements.polymer-project.org/elements/iron-list?view=demo:demo/selection.html&active=iron-list
}